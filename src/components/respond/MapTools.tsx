export type MapTool = 'pan' | 'rectangle' | 'polygon' | 'line';

interface MapToolsProps {
  tool: MapTool;
  layerOn: boolean;
  canClear: boolean;
  canZoomIn: boolean;
  canZoomOut: boolean;
  onToolChange: (tool: MapTool) => void;
  onClear: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onHome: () => void;
}

/** Official Esri Calcite UI icon paths (Apache-2.0), 16px. */
const GLYPHS = {
  pan: 'M6.027 10.47a1.4 1.4 0 0 0 .24-.329.7.7 0 0 0-.112-.278 2.2 2.2 0 0 1-.255-.56c-.14-.928-.742-1.292-1.341-2.372-1.135-2.01-1.388-2.224-1.458-2.477-.396-1.454 1.1-1.948 2.032-.816.308.361.796.935.988 1.167.338.412.72.865 1.032 1.29.125.169.227.297.31.395 0 0-.179-.732-.188-.76-.234-.605-.46-1.295-.81-2.156a5 5 0 0 1-.44-1.469.84.84 0 0 1 .386-.815 1.37 1.37 0 0 1 .717-.19 1.26 1.26 0 0 1 1.053.515 3.7 3.7 0 0 1 .388.758l.141.275c.05.146.091.26.139.372.007.018-.076-.116.769 1.673a8 8 0 0 0-.11-1.12 4.7 4.7 0 0 1-.213-1.558 1.226 1.226 0 0 1 1.26-.91 2 2 0 0 1 .154.009 1.07 1.07 0 0 1 .871.58 5.6 5.6 0 0 1 .4 1.719c.025.205.082.5.15.835l.05.252c.082.401.15.743.195 1.062l.064.666.044-.168a4 4 0 0 0 .14-.687 6 6 0 0 0-.03-1.246.94.94 0 0 1 .422-.985A1.3 1.3 0 0 1 13.582 3a1.39 1.39 0 0 1 1.377 1.41 14.7 14.7 0 0 1-.175 3.073 3.3 3.3 0 0 0-.026 1.446l.04.139c.045.14.08.257.118.407a16 16 0 0 1-.079 2.32 10 10 0 0 1-.09 1.149 5 5 0 0 0-.06.82 3.5 3.5 0 0 0 .866 1.542A5.5 5.5 0 0 1 16 16h-.72c-.3-.704-1.158-1.375-1.213-2.2a5.4 5.4 0 0 1 .06-.884 10 10 0 0 0 .09-1.122c0-.84.122-2.058.09-2.194a6 6 0 0 0-.096-.341 2 2 0 0 1-.056-.188 3.7 3.7 0 0 1 .016-1.686 10.2 10.2 0 0 0 .097-2.836c-.026-.265-.227-.949-.686-.949a.4.4 0 0 0-.274.077.66.66 0 0 0-.098.53 5 5 0 0 1 .033 1.209 4 4 0 0 1-.15.757c-.037.143-.068.263-.095.386l-.03.192a1 1 0 0 1-.06.254.56.56 0 0 1-.522.375c-.254.015-.427-.142-.5-.515a5 5 0 0 1-.061-.552 12 12 0 0 0-.069-.676 20 20 0 0 0-.199-1.101c-.07-.357-.165-.78-.195-1.076a5.2 5.2 0 0 0-.353-1.543.44.44 0 0 0-.361-.232c-.14 0-.626.01-.742.378a1.7 1.7 0 0 0-.02.674c.1.79.196 1.276.286 2.067.177 1.546.565 1.53.342 1.94a.3.3 0 0 1-.46.078 6.4 6.4 0 0 1-.7-1.344 20 20 0 0 0-.848-2.066 9.7 9.7 0 0 0-.849-1.485.61.61 0 0 0-.527-.251.554.554 0 0 0-.612.488 21 21 0 0 0 .915 2.46l.63 1.69c.15.346.267.927-.329.905-.203-.038-.396-.043-.968-.813-.083-.11-1.364-1.725-1.461-1.878a1.63 1.63 0 0 0-1.28-.86c-.894 0-.212.763 1.086 2.995a8 8 0 0 0 .522.787l.28.397a3.45 3.45 0 0 1 .603 1.368.6.6 0 0 0 .077.188l.153.266a.74.74 0 0 1 .076.733 2 2 0 0 1-.266.38.72.72 0 0 1-.516.27 4.2 4.2 0 0 1-.875-.23c-.824-.292-.849-.225-1.032-.44a1.75 1.75 0 0 0-.737-.568 2.2 2.2 0 0 0-.601-.101c-.138-.01-.895.32-.763.64.056.036.48.35.763.529.412.28.245.626 1.099 1.018a13.3 13.3 0 0 1 2.067 1.106c.348.21.739.392 1.124.674 1.7 1.238 2.177.598 2.858 2.113l.059.13-.11.077h-.491c-.535-.883-.352-.642-1.552-1.171a12 12 0 0 1-1.553-.96 14.5 14.5 0 0 0-2.681-1.449 2.1 2.1 0 0 1-1.23-1.02 7 7 0 0 1-.935-.685c-.236-.24-.085-.947.42-1.28a1.47 1.47 0 0 1 .909-.314 2 2 0 0 1 .871.153 2.9 2.9 0 0 1 .895.718c.284.006 1.065.405 1.482.477z',
  rectangle: 'M0 1v14h16V1zm15 13H1V2h14z',
  polygon: 'M15 1 6.833 7 1 4v11h14zm-1 13H2V5.639l4.927 2.534L14 2.976z',
  line: 'M6 5v1.293L9.707 10h.328L14 3.657V2h2v2h-1.035L11 10.343V12H9v-1.293L5.293 7h-.492L2 12.383V14H0v-2h1.073L4 6.374V5z',
  clear: 'M1 2v2.582A7.795 7.795 0 1 1 .272 9h1.01a6.802 6.802 0 1 0 .625-4H4v1H0V2z',
  zoomIn: 'M9 4v4h4v1H9v4H8V9H4V8h4V4z',
  zoomOut: 'M13 8v1H3V8z',
  home: 'M3 1v4.5L.5 8H2v7h5v-4h2v4h5V8h1.5L8 .5l-2 2V1zm5 .914 5 5V14h-3v-4H6v4H3V6.914l1-1V2h1v2.914z',
} as const;

function Glyph({ name }: { name: keyof typeof GLYPHS }) {
  return (
    <svg viewBox="0 0 16 16" className="esri-glyph" aria-hidden="true">
      <path d={GLYPHS[name]} />
    </svg>
  );
}

function MapAction({
  label,
  glyph,
  pressed,
  disabled,
  tip,
  onClick,
}: {
  label: string;
  glyph: keyof typeof GLYPHS;
  pressed?: boolean;
  disabled?: boolean;
  tip: 'below' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`esri-action esri-tip-${tip}`}
      aria-label={label}
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
    >
      <Glyph name={glyph} />
      <span className="esri-tip" aria-hidden="true">
        {label}
      </span>
    </button>
  );
}

export default function MapTools({
  tool,
  layerOn,
  canClear,
  canZoomIn,
  canZoomOut,
  onToolChange,
  onClear,
  onZoomIn,
  onZoomOut,
  onHome,
}: MapToolsProps) {
  return (
    <>
      <div className="esri-toolbar" role="toolbar" aria-label="Selection tools">
        <MapAction
          label="Pan"
          glyph="pan"
          tip="below"
          pressed={tool === 'pan'}
          onClick={() => onToolChange('pan')}
        />
        <MapAction
          label="Select by rectangle"
          glyph="rectangle"
          tip="below"
          pressed={tool === 'rectangle'}
          disabled={!layerOn}
          onClick={() => onToolChange('rectangle')}
        />
        <MapAction
          label="Select by polygon"
          glyph="polygon"
          tip="below"
          pressed={tool === 'polygon'}
          disabled={!layerOn}
          onClick={() => onToolChange('polygon')}
        />
        <MapAction
          label="Select by line"
          glyph="line"
          tip="below"
          pressed={tool === 'line'}
          disabled={!layerOn}
          onClick={() => onToolChange('line')}
        />
        <MapAction label="Clear" glyph="clear" tip="below" disabled={!canClear} onClick={onClear} />
      </div>
      <div className="esri-zoom-stack" role="toolbar" aria-label="Map view">
        <div className="esri-zoom-pair">
          <MapAction label="Zoom in" glyph="zoomIn" tip="right" disabled={!canZoomIn} onClick={onZoomIn} />
          <MapAction label="Zoom out" glyph="zoomOut" tip="right" disabled={!canZoomOut} onClick={onZoomOut} />
        </div>
        <MapAction label="Default map view" glyph="home" tip="right" onClick={onHome} />
      </div>
    </>
  );
}
