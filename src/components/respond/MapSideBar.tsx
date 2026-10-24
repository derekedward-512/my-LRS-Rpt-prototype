import { useState, type ReactNode } from 'react';
import BasemapPanel from '@/components/respond/BasemapPanel';
import type { BasemapId } from '@/data/map-tiles';

interface MapSideBarProps {
  legendOpen: boolean;
  onLegendToggle: () => void;
  basemap: BasemapId;
  onBasemapChange: (id: BasemapId) => void;
  children?: ReactNode;
}

const GLYPHS = {
  basemap:
    'M16 3V0H9v7h7zm-1-2v1h-3V1zm-4 0v2h2v1h-3V1zm-1 5V5h4V3h1v3zM7 0H0v7h7zM6 4h-.33A2.674 2.674 0 0 1 3 1.33V1h3zM1 6V5h.561A.44.44 0 0 1 2 5.439V6zm2 0v-.561A1.44 1.44 0 0 0 1.561 4H1V1h1v.33A3.675 3.675 0 0 0 5.67 5H6v1zm13 3H9v7h7zm-6 6v-3h3v1h-1v1h1v1zm5 0h-1v-3h1zm0-4h-5v-1h5zM7 9H0v7h7zm-1 1v3.09a9 9 0 0 0-.314.057l-.051-.12a3.1 3.1 0 0 0-.653-1.06c-.873-.872-1.18-1.093-1.977-1.093A3.3 3.3 0 0 0 1 12.024V10zm-5 5v-1.432l.11-.149a3.73 3.73 0 0 1 1.895-1.545c.397 0 .47 0 1.27.8a2.2 2.2 0 0 1 .438.742c.112.265.328.78.807.78a.8.8 0 0 0 .245-.041c.013-.005.079-.021.235-.05V15z',
  legend:
    'M1 6.5A1.5 1.5 0 1 1 2.5 8 1.5 1.5 0 0 1 1 6.5M15 2H6v1h9zM6 7h9V6H6zm0 4h9v-1H6zm0 4h9v-1H6zm-3.51-2L.87 16h3.257zM4 4H1V1h3zM3 2H2v1h1zm1 10H1V9h3zm-1-2H2v1h1zm-.5-4a.5.5 0 1 0 .5.5.5.5 0 0 0-.5-.5',
  expand: 'm8.207 4-4 4 4 4H6.793l-4-4 4-4zm4.586 0-4 4 4 4h1.414l-4-4 4-4z',
  collapse: 'm7.793 12 4-4-4-4h1.414l4 4-4 4zm-4.586 0 4-4-4-4H1.793l4 4-4 4z',
} as const;

function Glyph({ name }: { name: keyof typeof GLYPHS }) {
  return (
    <svg viewBox="0 0 16 16" className="esri-glyph" aria-hidden="true">
      <path d={GLYPHS[name]} />
    </svg>
  );
}

function SideAction({
  label,
  glyph,
  pressed,
  expanded,
  onClick,
}: {
  label: string;
  glyph: keyof typeof GLYPHS;
  pressed?: boolean;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="esri-action esri-tip-left"
      aria-label={label}
      aria-pressed={pressed}
      aria-expanded={label === 'Expand' ? expanded : undefined}
      onClick={onClick}
    >
      <span className="esri-side-label">{label}</span>
      <Glyph name={glyph} />
      <span className="esri-tip" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}

export default function MapSideBar({
  legendOpen,
  onLegendToggle,
  basemap,
  onBasemapChange,
  children,
}: MapSideBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [basemapOpen, setBasemapOpen] = useState(false);

  return (
    <div className="esri-side-wrap">
      {(basemapOpen || legendOpen) && (
        <div className="esri-side-panels">
          {basemapOpen && <BasemapPanel basemap={basemap} onBasemapChange={onBasemapChange} />}
          {children}
        </div>
      )}
      <div className={`esri-side ${expanded ? 'is-expanded' : ''}`} role="toolbar" aria-label="Map contents">
        <SideAction
          label="Base Maps"
          glyph="basemap"
          pressed={basemapOpen}
          expanded={expanded}
          onClick={() => setBasemapOpen((open) => !open)}
        />
        <SideAction
          label="Legend"
          glyph="legend"
          pressed={legendOpen}
          expanded={expanded}
          onClick={onLegendToggle}
        />
        <div className="esri-side-spacer" />
        <SideAction
          label="Expand"
          glyph={expanded ? 'collapse' : 'expand'}
          expanded={expanded}
          onClick={() => setExpanded((open) => !open)}
        />
      </div>
    </div>
  );
}
