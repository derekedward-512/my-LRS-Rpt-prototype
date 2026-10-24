import { ModusWcTypography } from '@trimble-oss/moduswebcomponents-react';
import { BASEMAPS, type BasemapId } from '@/data/map-tiles';

interface BasemapPanelProps {
  basemap: BasemapId;
  onBasemapChange: (id: BasemapId) => void;
}

export default function BasemapPanel({ basemap, onBasemapChange }: BasemapPanelProps) {
  return (
    <div className="basemap-panel">
      <ModusWcTypography hierarchy="h2" size="md">
        Base Maps
      </ModusWcTypography>
      <div className="mt-2 flex flex-col gap-1">
        {BASEMAPS.map((item) => {
          const selected = item.id === basemap;
          return (
            <button
              key={item.id}
              type="button"
              className={`basemap-option ${selected ? 'is-selected' : ''}`}
              aria-pressed={selected}
              aria-label={item.label}
              onClick={() => onBasemapChange(item.id)}
            >
              <img className="basemap-thumb" alt="" src={item.previewUrl} />
              <ModusWcTypography hierarchy="p" size="md" label={item.label} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
