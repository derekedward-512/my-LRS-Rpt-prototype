import { useMemo, useRef, useState } from 'react';
import {
  ModusWcAlert,
  ModusWcTable,
  ModusWcTypography,
} from '@trimble-oss/moduswebcomponents-react';
import { LOCATIONS, locationLength, measureLabel } from '@/data/lrs-work-history';
import PaneSplitter from '@/components/respond/PaneSplitter';
import MapCanvas, { type MapTool } from '@/components/respond/MapCanvas';
import WorkActivitiesPanel from '@/components/respond/WorkActivitiesPanel';

export default function RespondPage() {
  const splitRef = useRef<HTMLDivElement>(null);
  const [layerOn, setLayerOn] = useState(false);
  const [tool, setTool] = useState<MapTool>('rectangle');
  const [legendOpen, setLegendOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const selected = useMemo(
    () => LOCATIONS.filter((location) => selectedIds.includes(location.id)),
    [selectedIds],
  );

  function toggleId(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  const locationRows = selected.map((location) => ({
    id: location.id,
    routeName: location.routeName,
    fromMeasure: measureLabel(location.fromMeasure),
    toMeasure: measureLabel(location.toMeasure),
    miles: locationLength(location).toFixed(2),
    assetDescription: location.assetDescription,
    assetGuid: location.assetGuid,
  }));

  return (
    <div className="flex h-[calc(100dvh-56px)] flex-col">
      <div className="no-print px-4 pt-3">
        <ModusWcAlert
          variant="info"
          alertTitle="Sample data"
          alertDescription="Sample work orders on the Edmond World Street Map. Turn on LRS Work History, then select the route segments."
        />
      </div>
      <div ref={splitRef} className="split-row flex min-h-0 flex-1 flex-col">
        <section className="asset-pane flex max-h-[50dvh] min-h-0 w-full flex-col gap-4 overflow-y-auto border-b-[1px] border-solid border-base-300 bg-base-100 p-4">
          <div className="flex flex-col gap-1">
            <ModusWcTypography hierarchy="h1" size="lg">
              Asset Details
            </ModusWcTypography>
            <ModusWcTypography hierarchy="p" size="md" label={`${selected.length} LRS work locations selected`} />
          </div>
          {selected.length === 0 ? (
            <ModusWcTypography hierarchy="p" size="md">
              Turn on LRS Work History in the legend, then select route segments with the
              rectangle, polygon, or line tool. Click a segment to add or remove it. Pan moves
              the map.
            </ModusWcTypography>
          ) : (
            <div className="overflow-x-auto">
              <ModusWcTable
                mode="simple"
                caption="Selected LRS work locations"
                currentPage={1}
                pageSizeOptions={[25]}
                density="compact"
                hover
                columns={[
                  { id: 'routeName', accessor: 'routeName', header: 'Route Name' },
                  { id: 'fromMeasure', accessor: 'fromMeasure', header: 'From Measure' },
                  { id: 'toMeasure', accessor: 'toMeasure', header: 'To Measure' },
                  { id: 'miles', accessor: 'miles', header: 'Miles' },
                  { id: 'assetDescription', accessor: 'assetDescription', header: 'Asset Description' },
                  { id: 'assetGuid', accessor: 'assetGuid', header: 'Asset GUID' },
                ]}
                data={locationRows}
              />
            </div>
          )}
          <WorkActivitiesPanel selected={selected} />
        </section>
        <PaneSplitter containerRef={splitRef} />
        <section className="map-pane no-print relative min-h-0 min-w-0 flex-1">
          {!layerOn && (
            <div className="pointer-events-none absolute inset-x-0 top-16 z-10 flex justify-center">
              <div className="bg-base-100 px-3 py-2">
                <ModusWcTypography hierarchy="p" size="md">
                  LRS Work History is off. Turn it on in the legend.
                </ModusWcTypography>
              </div>
            </div>
          )}
          <MapCanvas
            locations={LOCATIONS}
            layerOn={layerOn}
            selectedIds={selectedIds}
            tool={tool}
            onToolChange={setTool}
            onSelectIds={setSelectedIds}
            onToggleId={toggleId}
            legendOpen={legendOpen}
            onLegendToggle={() => setLegendOpen((open) => !open)}
            onLayerChange={(on) => {
              setLayerOn(on);
              if (!on) setSelectedIds([]);
            }}
          />
        </section>
      </div>
    </div>
  );
}
