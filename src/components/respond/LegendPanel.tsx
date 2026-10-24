import { ModusWcCheckbox, ModusWcTypography } from '@trimble-oss/moduswebcomponents-react';

interface LegendPanelProps {
  layerOn: boolean;
  basemapLabel: string;
  onLayerChange: (on: boolean) => void;
}

export default function LegendPanel({ layerOn, basemapLabel, onLayerChange }: LegendPanelProps) {
  return (
    <div className="map-legend w-64 shrink-0 bg-base-100 p-3 shadow-md">
      <ModusWcTypography hierarchy="h2" size="md">
        Legend
      </ModusWcTypography>
      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true">
            <line
              x1="0"
              y1="5"
              x2="28"
              y2="5"
              stroke="var(--modus-wc-color-base-content)"
              strokeWidth="4"
            />
          </svg>
          <ModusWcTypography hierarchy="p" size="sm" label={basemapLabel} />
        </div>
        <div className="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true">
            <line
              x1="0"
              y1="5"
              x2="28"
              y2="5"
              stroke="var(--modus-wc-color-primary)"
              strokeWidth="4"
            />
          </svg>
          <ModusWcCheckbox
            label="LRS Work History"
            value={layerOn}
            indeterminate={false}
            onInputChange={() => onLayerChange(!layerOn)}
          />
        </div>
        <ModusWcTypography hierarchy="p" size="sm" customClass="opacity-70">
          Past work orders drawn on the route. Measures are miles. Turn this on, then select
          by rectangle, polygon, or line.
        </ModusWcTypography>
      </div>
    </div>
  );
}
