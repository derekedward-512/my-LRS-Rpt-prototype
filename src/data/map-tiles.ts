/** Web Mercator helpers for raster basemap tiles around Edmond, Oklahoma. */

export const TILE_SIZE = 256;

export type BasemapId = 'streets' | 'osm';

export interface BasemapOption {
  id: BasemapId;
  label: string;
  credit: string;
  previewUrl: string;
}

const STREET_CREDIT =
  'Sources: Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, NRCan, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, Esri (Thailand), NGCC, (c) OpenStreetMap contributors, and the GIS User Community';

/** Edmond preview tile used as the picker thumbnail. */
const PREVIEW_ZOOM = 13;
const PREVIEW_ROW = 3225;
const PREVIEW_COLUMN = 1878;

export const BASEMAPS: BasemapOption[] = [
  {
    id: 'streets',
    label: 'World Street Map',
    credit: STREET_CREDIT,
    previewUrl: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${PREVIEW_ZOOM}/${PREVIEW_ROW}/${PREVIEW_COLUMN}`,
  },
  {
    id: 'osm',
    label: 'OpenStreetMap',
    credit: '© OpenStreetMap contributors',
    previewUrl: `https://tile.openstreetmap.org/${PREVIEW_ZOOM}/${PREVIEW_COLUMN}/${PREVIEW_ROW}.png`,
  },
];

export const DEFAULT_BASEMAP: BasemapId = 'streets';
export const MIN_ZOOM = 11;
export const MAX_ZOOM = 16;
export const HOME_ZOOM = 13;

/** Danforth Road at Broadway, the middle of the sample work locations. */
export const HOME_CENTER = { lat: 35.684, lon: -97.449 };

export function tileUrl(basemap: BasemapId, zoom: number, row: number, column: number): string {
  if (basemap === 'osm') {
    // The ArcGIS open/osm-style endpoint requires a token, so the prototype
    // draws the same OpenStreetMap data from the public raster tiles.
    return `https://tile.openstreetmap.org/${zoom}/${column}/${row}.png`;
  }
  return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${zoom}/${row}/${column}`;
}

export function basemapById(id: BasemapId): BasemapOption {
  return BASEMAPS.find((item) => item.id === id) ?? BASEMAPS[0];
}

export function worldPoint(lat: number, lon: number, zoom: number): { x: number; y: number } {
  const size = TILE_SIZE * 2 ** zoom;
  const x = ((lon + 180) / 360) * size;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * size;
  return { x, y };
}

export function worldToLatLon(x: number, y: number, zoom: number): { lat: number; lon: number } {
  const size = TILE_SIZE * 2 ** zoom;
  const lon = (x / size) * 360 - 180;
  const mercator = Math.PI - (2 * Math.PI * y) / size;
  const lat = (180 / Math.PI) * Math.atan(Math.sinh(mercator));
  return { lat, lon };
}

/** Ground miles represented by one screen pixel at this latitude and tile zoom. */
export function milesPerPixel(lat: number, zoom: number): number {
  const meters = (156543.03392 * Math.cos((lat * Math.PI) / 180)) / 2 ** zoom;
  return meters / 1609.344;
}
