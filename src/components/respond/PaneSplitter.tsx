import { useEffect, useRef } from 'react';

interface PaneSplitterProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const MIN_PANE = 280;
const MIN_MAP = 320;

function limits(container: HTMLDivElement): { min: number; max: number } {
  const bar = container.querySelector('.pane-splitter')?.getBoundingClientRect().width ?? 0;
  const max = Math.max(MIN_PANE, container.getBoundingClientRect().width - MIN_MAP - bar);
  return { min: MIN_PANE, max };
}

function clampWidth(container: HTMLDivElement, width: number): number {
  const { min, max } = limits(container);
  return Math.min(max, Math.max(min, width));
}

export default function PaneSplitter({ containerRef }: PaneSplitterProps) {
  const separatorRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function apply(width: number) {
    const container = containerRef.current;
    const separator = separatorRef.current;
    if (!container || !separator) return;
    const next = Math.round(clampWidth(container, width));
    container.style.setProperty('--asset-pane', `${next}px`);
    const { min, max } = limits(container);
    separator.setAttribute('aria-valuenow', String(next));
    separator.setAttribute('aria-valuemin', String(min));
    separator.setAttribute('aria-valuemax', String(Math.round(max)));
  }

  function paneWidth(): number {
    const pane = containerRef.current?.querySelector('.asset-pane');
    return pane?.getBoundingClientRect().width ?? 384;
  }

  useEffect(() => {
    const container = containerRef.current;
    const separator = separatorRef.current;
    if (container && separator) {
      const width = Math.round(paneWidth());
      const { min, max } = limits(container);
      separator.setAttribute('aria-valuenow', String(width));
      separator.setAttribute('aria-valuemin', String(min));
      separator.setAttribute('aria-valuemax', String(Math.round(max)));
    }
    const onResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const custom = container.style.getPropertyValue('--asset-pane');
      if (!custom.endsWith('px')) return;
      apply(Number.parseFloat(custom));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [containerRef]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    containerRef.current?.classList.add('is-resizing');
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const container = containerRef.current;
    if (!dragging.current || !container) return;
    apply(event.clientX - container.getBoundingClientRect().left);
  }

  function onPointerUp() {
    dragging.current = false;
    containerRef.current?.classList.remove('is-resizing');
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 48 : 16;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      apply(paneWidth() - step);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      apply(paneWidth() + step);
    }
  }

  return (
    <div
      ref={separatorRef}
      className="pane-splitter no-print"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize Asset Details and the map"
      aria-valuemin={MIN_PANE}
      aria-valuenow={384}
      aria-valuemax={800}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={() => {
        containerRef.current?.style.removeProperty('--asset-pane');
        const separator = separatorRef.current;
        if (!separator) return;
        separator.setAttribute('aria-valuenow', String(Math.round(paneWidth())));
      }}
      onKeyDown={onKeyDown}
    />
  );
}
