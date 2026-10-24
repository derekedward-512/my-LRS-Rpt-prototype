/** Modus puts the native input event on CustomEvent.detail. The target may be the inner control or the host. */

export function valueFrom(event: Event): string {
  const detail = (event as CustomEvent<Event>).detail;
  const candidates = [detail?.target, event.target, event.currentTarget];
  for (const candidate of candidates) {
    if (candidate && typeof candidate === 'object' && 'value' in candidate) {
      const value = (candidate as { value?: unknown }).value;
      if (typeof value === 'string') return value;
    }
  }
  return '';
}

