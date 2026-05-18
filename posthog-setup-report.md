<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvents Next.js App Router project. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new) — Initializes PostHog client-side using the `instrumentation-client` pattern (Next.js 15.3+). Configured with the EU host, a reverse proxy at `/ingest`, exception capture for error tracking, and debug mode in development.
- **`next.config.ts`** — Added `rewrites()` to proxy PostHog ingestion through `/ingest/*` (routing to `eu.i.posthog.com`) and static assets through `/ingest/static/*` and `/ingest/array/*` (routing to `eu-assets.i.posthog.com`). Also set `skipTrailingSlashRedirect: true`.
- **`.env.local`** — Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`** — Added `posthog.capture("explore_clicked")` to the existing button `onClick` handler.
- **`components/EventCard.tsx`** — Added `"use client"` directive and `posthog.capture("event_card_clicked", { title, slug, location, date })` on `Link` click.
- **`components/Navbar.tsx`** — Added `"use client"` directive and `posthog.capture("nav_link_clicked", { label, href })` on each navigation link.

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `explore_clicked` | User clicks the Explore button on the homepage to scroll to the featured events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to navigate to the event detail page | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the top navbar | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](https://eu.posthog.com/project/177433/dashboard/675680)
- [Explore button clicks over time](https://eu.posthog.com/project/177433/insights/O9jGW9ch)
- [Event card clicks over time](https://eu.posthog.com/project/177433/insights/tUrbLa5b)
- [Nav link clicks by destination](https://eu.posthog.com/project/177433/insights/VFAB4X8t)
- [Explore → event detail conversion funnel](https://eu.posthog.com/project/177433/insights/l3XCNUQU)
- [Unique users per event type](https://eu.posthog.com/project/177433/insights/F7B7Qdue)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
