import { useEffect, useRef, useState } from 'react';
import { ModusWcTypography } from '@trimble-oss/moduswebcomponents-react';
import {
  DEFAULT_BASEMAP,
  HOME_CENTER,
  HOME_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  TILE_SIZE,
  basemapById,
  milesPerPixel,
  tileUrl,
  worldPoint,
  worldToLatLon,
  type BasemapId,
} from '@/data/map-tiles';
import { measureLabel, type LrsWorkLocation } from '@/data/lrs-work-history';
import LegendPanel from '@/components/respond/LegendPanel';
import MapSideBar from '@/components/respond/MapSideBar';
import MapTools, { type MapTool } from '@/components/respond/MapTools';

export type { MapTool };

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MapCanvasProps {
  locations: LrsWorkLocation[];
  layerOn: boolean;
  selectedIds: string[];
  tool: MapTool;
  onToolChange: (tool: MapTool) => void;
  onSelectIds: (ids: string[]) => void;
  onToggleId: (id: string) => void;
  legendOpen: boolean;
  onLegendToggle: () => void;
  onLayerChange: (on: boolean) => void;
}

interface PanDrag {
  kind: 'pan';
  pointerX: number;
  pointerY: number;
  centerX: number;
  centerY: number;
  unitsPerPxX: number;
  unitsPerPxY: number;
}

interface RectDrag {
  kind: 'rect';
  x: number;
  y: number;
  w: number;
  h: number;
}

type Xy = [number, number];

const LINE_HIT_PX = 12;

function normalize(rect: Rect): Rect {
  return {
    x: rect.w < 0 ? rect.x + rect.w : rect.x,
    y: rect.h < 0 ? rect.y + rect.h : rect.y,
    w: Math.abs(rect.w),
    h: Math.abs(rect.h),
  };
}

function pointInRect(x: number, y: number, rect: Rect): boolean {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function shiftLine(points: Xy[], lanes: number): Xy[] {
  if (lanes === 0 || points.length < 2) return points;
  const shift = lanes * 8;
  return points.map(([x, y], index) => {
    const previous = points[Math.max(0, index - 1)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const dx = next[0] - previous[0];
    const dy = next[1] - previous[1];
    const length = Math.hypot(dx, dy) || 1;
    return [x + (-dy / length) * shift, y + (dx / length) * shift];
  });
}

function segmentHits(points: Xy[], rect: Rect): boolean {
  for (let index = 0; index < points.length - 1; index += 1) {
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    for (let step = 0; step <= 8; step += 1) {
      const t = step / 8;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      if (pointInRect(x, y, rect)) return true;
    }
  }
  return false;
}

function cross(ax: number, ay: number, bx: number, by: number): number {
  return ax * by - ay * bx;
}

function rangesOverlap(a1: number, a2: number, b1: number, b2: number): boolean {
  return Math.max(Math.min(a1, a2), Math.min(b1, b2)) <= Math.min(Math.max(a1, a2), Math.max(b1, b2));
}

function segmentsIntersect(a: Xy, b: Xy, c: Xy, d: Xy): boolean {
  const abx = b[0] - a[0];
  const aby = b[1] - a[1];
  const abC = cross(abx, aby, c[0] - a[0], c[1] - a[1]);
  const abD = cross(abx, aby, d[0] - a[0], d[1] - a[1]);
  const cdx = d[0] - c[0];
  const cdy = d[1] - c[1];
  const cdA = cross(cdx, cdy, a[0] - c[0], a[1] - c[1]);
  const cdB = cross(cdx, cdy, b[0] - c[0], b[1] - c[1]);
  if (abC === 0 && abD === 0) {
    return rangesOverlap(a[0], b[0], c[0], d[0]) && rangesOverlap(a[1], b[1], c[1], d[1]);
  }
  return abC * abD <= 0 && cdA * cdB <= 0;
}

function pointInPolygon(x: number, y: number, polygon: Xy[]): boolean {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const [xi, yi] = polygon[index];
    const [xj, yj] = polygon[previous];
    const crosses = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function polygonHits(route: Xy[], polygon: Xy[]): boolean {
  if (polygon.length < 3) return false;
  if (route.some(([x, y]) => pointInPolygon(x, y, polygon))) return true;
  for (let routeIndex = 0; routeIndex < route.length - 1; routeIndex += 1) {
    for (let edge = 0; edge < polygon.length; edge += 1) {
      const next = (edge + 1) % polygon.length;
      if (segmentsIntersect(route[routeIndex], route[routeIndex + 1], polygon[edge], polygon[next])) {
        return true;
      }
    }
  }
  return false;
}

function distToSegment(point: Xy, a: Xy, b: Xy): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(point[0] - a[0], point[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / len2));
  return Math.hypot(point[0] - (a[0] + t * dx), point[1] - (a[1] + t * dy));
}

function segmentDistance(a: Xy, b: Xy, c: Xy, d: Xy): number {
  if (segmentsIntersect(a, b, c, d)) return 0;
  return Math.min(distToSegment(a, c, d), distToSegment(b, c, d), distToSegment(c, a, b), distToSegment(d, a, b));
}

function lineHits(route: Xy[], stroke: Xy[]): boolean {
  if (stroke.length < 2) return false;
  for (let routeIndex = 0; routeIndex < route.length - 1; routeIndex += 1) {
    for (let strokeIndex = 0; strokeIndex < stroke.length - 1; strokeIndex += 1) {
      if (
        segmentDistance(route[routeIndex], route[routeIndex + 1], stroke[strokeIndex], stroke[strokeIndex + 1]) <=
        LINE_HIT_PX
      ) {
        return true;
      }
    }
  }
  return false;
}

function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) return { x: 0, y: 0 };
  const mapped = point.matrixTransform(matrix.inverse());
  return { x: mapped.x, y: mapped.y };
}

function niceMiles(raw: number): number {
  const steps = [0.1, 0.2, 0.5, 1, 2, 5];
  return steps.reduce((best, step) => (Math.abs(step - raw) < Math.abs(best - raw) ? step : best));
}

export default function MapCanvas({
  locations,
  layerOn,
  selectedIds,
  tool,
  onToolChange,
  onSelectIds,
  onToggleId,
  legendOpen,
  onLegendToggle,
  onLayerChange,
}: MapCanvasProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<PanDrag | RectDrag | null>(null);
  const sketchRef = useRef<Xy[]>([]);
  const [zoom, setZoom] = useState(HOME_ZOOM);
  const [center, setCenter] = useState(HOME_CENTER);
  const [size, setSize] = useState({ w: 960, h: 600 });
  const [draft, setDraft] = useState<Rect | null>(null);
  const [sketch, setSketch] = useState<Xy[]>([]);
  const [hover, setHover] = useState<Xy | null>(null);
  const [basemap, setBasemap] = useState<BasemapId>(DEFAULT_BASEMAP);
  const selected = new Set(selectedIds);
  const drawing = layerOn && (tool === 'polygon' || tool === 'line');

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => {
      const rect = frame.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      setSize((current) => (current.w === w && current.h === h ? current : { w, h }));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    sketchRef.current = [];
    setSketch([]);
    setHover(null);
    setDraft(null);
    dragRef.current = null;
  }, [tool, layerOn]);

  const centerWorld = worldPoint(center.lat, center.lon, zoom);
  const viewX = centerWorld.x - size.w / 2;
  const viewY = centerWorld.y - size.h / 2;
  const tileCount = 2 ** zoom;
  const columnStart = Math.floor(viewX / TILE_SIZE);
  const columnEnd = Math.floor((viewX + size.w) / TILE_SIZE);
  const rowStart = Math.floor(viewY / TILE_SIZE);
  const rowEnd = Math.floor((viewY + size.h) / TILE_SIZE);
  const tiles: Array<{ column: number; row: number }> = [];
  for (let row = rowStart; row <= rowEnd; row += 1) {
    for (let column = columnStart; column <= columnEnd; column += 1) {
      if (column < 0 || row < 0 || column >= tileCount || row >= tileCount) continue;
      tiles.push({ column, row });
    }
  }

  const projected = locations.map((location) => ({
    location,
    points: shiftLine(
      location.path.map((point) => {
        const world = worldPoint(point.lat, point.lon, zoom);
        return [world.x, world.y] as Xy;
      }),
      location.drawOffset ?? 0,
    ),
  }));

  const ground = milesPerPixel(center.lat, zoom);
  const barMiles = niceMiles(110 * ground);
  const barPx = barMiles / ground;
  const scaleLabel = barMiles >= 1 ? `${barMiles} mi` : `${barMiles.toFixed(1)} mi`;
  const rubber = hover ? [...sketch, hover] : sketch;

  function clearSketch() {
    sketchRef.current = [];
    setSketch([]);
    setHover(null);
  }

  function commitSketch(points: Xy[]) {
    clearSketch();
    if (!layerOn) return;
    if (tool === 'polygon' && points.length >= 3) {
      onSelectIds(
        projected.filter((item) => polygonHits(item.points, points)).map((item) => item.location.id),
      );
      return;
    }
    if (tool === 'line' && points.length >= 2) {
      onSelectIds(projected.filter((item) => lineHits(item.points, points)).map((item) => item.location.id));
    }
  }

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    if (!svgRef.current) return;
    frameRef.current?.focus({ preventScroll: true });
    const target = event.target;
    const onFeature = target instanceof Element && Boolean(target.closest('[data-event-id]'));
    if (onFeature && tool === 'rectangle' && layerOn) return;
    svgRef.current.setPointerCapture(event.pointerId);
    const start = clientToSvg(svgRef.current, event.clientX, event.clientY);
    if (drawing) {
      const first = sketchRef.current[0];
      if (
        tool === 'polygon' &&
        first &&
        sketchRef.current.length >= 3 &&
        Math.hypot(start.x - first[0], start.y - first[1]) <= LINE_HIT_PX
      ) {
        commitSketch(sketchRef.current);
        return;
      }
      const next: Xy[] = [...sketchRef.current, [start.x, start.y]];
      sketchRef.current = next;
      setSketch(next);
      return;
    }
    if (tool === 'rectangle' && layerOn) {
      dragRef.current = { kind: 'rect', x: start.x, y: start.y, w: 0, h: 0 };
      setDraft({ x: start.x, y: start.y, w: 0, h: 0 });
      return;
    }
    const bounds = svgRef.current.getBoundingClientRect();
    const world = worldPoint(center.lat, center.lon, zoom);
    dragRef.current = {
      kind: 'pan',
      pointerX: event.clientX,
      pointerY: event.clientY,
      centerX: world.x,
      centerY: world.y,
      unitsPerPxX: size.w / bounds.width,
      unitsPerPxY: size.h / bounds.height,
    };
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (drawing && svgRef.current && !dragRef.current) {
      const point = clientToSvg(svgRef.current, event.clientX, event.clientY);
      setHover([point.x, point.y]);
    }
    const drag = dragRef.current;
    if (!drag || !svgRef.current) return;
    if (drag.kind === 'rect') {
      const point = clientToSvg(svgRef.current, event.clientX, event.clientY);
      drag.w = point.x - drag.x;
      drag.h = point.y - drag.y;
      setDraft({ x: drag.x, y: drag.y, w: drag.w, h: drag.h });
      return;
    }
    const dx = (event.clientX - drag.pointerX) * drag.unitsPerPxX;
    const dy = (event.clientY - drag.pointerY) * drag.unitsPerPxY;
    setCenter(worldToLatLon(drag.centerX - dx, drag.centerY - dy, zoom));
  }

  function onPointerUp() {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.kind !== 'rect') return;
    const rect = normalize(drag);
    setDraft(null);
    if (rect.w < 8 && rect.h < 8) return;
    onSelectIds(
      projected.filter((item) => segmentHits(item.points, rect)).map((item) => item.location.id),
    );
  }

  function onDoubleClick(event: React.MouseEvent<SVGSVGElement>) {
    if (!drawing) return;
    event.preventDefault();
    commitSketch(sketchRef.current.slice(0, -1));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') clearSketch();
    if (event.key === 'Enter' && sketchRef.current.length > 0) {
      event.preventDefault();
      commitSketch(sketchRef.current);
    }
  }

  const box = draft ? normalize(draft) : null;
  const cursor = tool === 'pan' || !layerOn ? 'cursor-grab' : 'cursor-crosshair';
  const activeBasemap = basemapById(basemap);

  return (
    <div
      ref={frameRef}
      className="map-frame relative h-full min-h-[480px] w-full"
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <svg
        ref={svgRef}
        viewBox={`${viewX} ${viewY} ${size.w} ${size.h}`}
        className={`map-surface touch-none text-base-content ${cursor}`}
        role="img"
        aria-label={`${activeBasemap.label} of Edmond, Oklahoma`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
      >
        {tiles.map((tile) => (
          <image
            key={`${basemap}-${zoom}-${tile.column}-${tile.row}`}
            href={tileUrl(basemap, zoom, tile.row, tile.column)}
            x={tile.column * TILE_SIZE}
            y={tile.row * TILE_SIZE}
            width={TILE_SIZE}
            height={TILE_SIZE}
          />
        ))}
        {layerOn &&
          projected.map(({ location, points }) => {
            const isSelected = selected.has(location.id);
            const lanes = location.drawOffset ?? 0;
            const [x1, y1] = points[0];
            const [x2, y2] = points[points.length - 1];
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const vertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
            const labelX = vertical ? midX + (lanes === 0 ? 12 : -lanes * 22) : midX;
            const labelY = vertical ? midY : midY + (lanes === 0 ? -14 : lanes * 22);
            const drawn = points.map((point) => point.join(',')).join(' ');
            return (
              <g key={location.id} data-event-id={location.id}>
                <polyline
                  data-event-id={location.id}
                  points={drawn}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={18}
                  strokeLinecap="round"
                  onPointerDown={(event) => {
                    if (tool !== 'rectangle' || !layerOn) return;
                    event.stopPropagation();
                    onToggleId(location.id);
                  }}
                />
                <polyline
                  points={drawn}
                  fill="none"
                  stroke="var(--modus-wc-color-primary)"
                  strokeOpacity={isSelected ? 1 : 0.9}
                  strokeWidth={isSelected ? 8 : 5}
                  strokeLinecap="round"
                  pointerEvents="none"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor={vertical ? 'start' : 'middle'}
                  fill="var(--modus-wc-color-primary)"
                  fontSize="12"
                  fontFamily="Open Sans, sans-serif"
                  pointerEvents="none"
                >
                  {`${location.routeName} ${measureLabel(location.fromMeasure)}–${measureLabel(location.toMeasure)}`}
                </text>
              </g>
            );
          })}
        {box && (
          <rect
            x={box.x}
            y={box.y}
            width={box.w}
            height={box.h}
            fill="var(--modus-wc-color-primary)"
            fillOpacity={0.15}
            stroke="var(--modus-wc-color-primary)"
            strokeWidth={1}
          />
        )}
        {rubber.length > 1 && (
          <g pointerEvents="none">
            {tool === 'polygon' && rubber.length >= 3 && (
              <polygon
                points={rubber.map((point) => point.join(',')).join(' ')}
                fill="var(--modus-wc-color-primary)"
                fillOpacity={0.15}
                stroke="none"
              />
            )}
            <polyline
              points={rubber.map((point) => point.join(',')).join(' ')}
              fill="none"
              stroke="var(--modus-wc-color-primary)"
              strokeWidth={1.5}
            />
            {tool === 'polygon' && sketch.length >= 2 && hover && (
              <line
                x1={hover[0]}
                y1={hover[1]}
                x2={sketch[0][0]}
                y2={sketch[0][1]}
                stroke="var(--modus-wc-color-primary)"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            )}
            {sketch.map((point, index) => (
              <circle
                key={`${point[0]}-${point[1]}-${index}`}
                cx={point[0]}
                cy={point[1]}
                r={3.5}
                fill="var(--modus-wc-color-base-100)"
                stroke="var(--modus-wc-color-primary)"
                strokeWidth={1.5}
              />
            ))}
          </g>
        )}
        <rect
          x={viewX + 12}
          y={viewY + size.h - 78}
          width={barPx + 56}
          height={22}
          fill="var(--modus-wc-color-base-100)"
        />
        <line
          x1={viewX + 18}
          y1={viewY + size.h - 64}
          x2={viewX + 18 + barPx}
          y2={viewY + size.h - 64}
          stroke="var(--modus-wc-color-base-content)"
          strokeWidth={3}
        />
        <text
          x={viewX + 24 + barPx}
          y={viewY + size.h - 60}
          fill="var(--modus-wc-color-base-content)"
          fontSize="12"
          fontFamily="Open Sans, sans-serif"
        >
          {scaleLabel}
        </text>
      </svg>
      <MapTools
        tool={tool}
        layerOn={layerOn}
        canClear={selectedIds.length > 0 || sketch.length > 0}
        canZoomIn={zoom < MAX_ZOOM}
        canZoomOut={zoom > MIN_ZOOM}
        onToolChange={onToolChange}
        onClear={() => {
          clearSketch();
          onSelectIds([]);
        }}
        onZoomIn={() => {
          clearSketch();
          setZoom((current) => Math.min(MAX_ZOOM, current + 1));
        }}
        onZoomOut={() => {
          clearSketch();
          setZoom((current) => Math.max(MIN_ZOOM, current - 1));
        }}
        onHome={() => {
          clearSketch();
          setZoom(HOME_ZOOM);
          setCenter(HOME_CENTER);
          onToolChange('rectangle');
        }}
      />
      <MapSideBar
        legendOpen={legendOpen}
        onLegendToggle={onLegendToggle}
        basemap={basemap}
        onBasemapChange={setBasemap}
      >
        {legendOpen && (
          <LegendPanel layerOn={layerOn} basemapLabel={activeBasemap.label} onLayerChange={onLayerChange} />
        )}
      </MapSideBar>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-base-100 px-2 py-1">
        <ModusWcTypography hierarchy="p" size="sm" label={activeBasemap.credit} />
      </div>
    </div>
  );
}
