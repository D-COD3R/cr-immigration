"use client";

import Link from "next/link";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * Server-component-safe link that fires a single analytics event on click.
 */
export function TrackedLink({
  event,
  payload,
  href,
  className,
  children,
}: {
  event: AnalyticsEvent;
  payload?: Record<string, string | number | boolean>;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => track(event, payload)}>
      {children}
    </Link>
  );
}
