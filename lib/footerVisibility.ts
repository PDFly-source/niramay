/**
 * Minimal external store (no persistence) that tracks whether the site
 * footer is currently intersecting the viewport. Kept outside the main
 * zustand store on purpose — this is ephemeral scroll UI state, not user
 * data, and doesn't need to survive reloads or go through storage.
 *
 * Producer: Footer (via useFooterInView). Consumer: NiramayAssistantTrigger,
 * so the floating AI button can hide itself while the footer is in view.
 */

type Listener = () => void;

let footerVisible = false;
const listeners = new Set<Listener>();

export function setFooterVisible(visible: boolean): void {
  if (footerVisible === visible) return;
  footerVisible = visible;
  listeners.forEach((listener) => listener());
}

export function getFooterVisible(): boolean {
  return footerVisible;
}

export function subscribeFooterVisible(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
