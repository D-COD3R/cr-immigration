/**
 * Vendor-agnostic analytics event layer.
 *
 * Events are forwarded to `window.dataLayer` when present (GTM-compatible)
 * and to a pluggable sink set via `setAnalyticsSink`. No vendor is locked in;
 * no sensitive intake answers are ever sent — only coarse event names.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "path_selected"
  | "assessment_started"
  | "assessment_step_completed"
  | "assessment_abandoned"
  | "assessment_submitted"
  | "assessment_submit_failed"
  | "contact_clicked"
  | "whatsapp_clicked"
  | "language_changed";

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let sink: ((event: AnalyticsEvent, payload: EventPayload) => void) | null = null;

export function setAnalyticsSink(fn: (event: AnalyticsEvent, payload: EventPayload) => void) {
  sink = fn;
}

export function track(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...payload });
  sink?.(event, payload);

  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, payload);
  }
}
