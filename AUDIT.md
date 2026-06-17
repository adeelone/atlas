# Requirements Audit

Source: Atlas project brief from the original prompt.

## Summary

- PASS: 25
- PARTIAL: 22
- FAIL: 4

PASS means the repo has a working local implementation. PARTIAL means the flow exists but uses local/mock behavior or is missing real provider integration. FAIL means it needs external setup or a larger feature that is not implemented yet.

## Product and Planning

| Requirement | Status | Notes |
| --- | --- | --- |
| Conversational trip entry | PASS | `ChatPlanner` generates a full local trip through `createTripFromText`. |
| Structured intent extraction | PASS | `extractIntent` handles destination, dates, duration, budget, interests, pace, lodging, diet, accessibility, and no-go defaults. |
| Targeted follow-up questions | PARTIAL | Missing-fields defaults exist, but the UI does not ask a true conversational follow-up yet. |
| Streaming generation progress | PARTIAL | The UI shows staged progress locally; it is not a server-sent LLM stream. |
| Guided wizard entry | PASS | `Wizard` captures step values and generates the shared trip model. |
| Decide-for-me shortcut | PASS | Each wizard step can fill a default. |
| Live wizard preview | PASS | Builder preview updates from current wizard values. |
| Paste-in anchors | PASS | Text, simple ICS, and booking URLs produce locked anchors. |
| OCR screenshots | FAIL | Upload UI exists for documents, but OCR is not implemented. |
| Locked anchor scheduling | PASS | Generated days preserve anchors as locked itinerary items. |

## Destination and Activities

| Requirement | Status | Notes |
| --- | --- | --- |
| Country, region, city, vibe input | PARTIAL | Japan, Southeast Asia, Portugal/default, and vibe words are handled locally. |
| City set and day allocation | PASS | `createTrip` spreads nights across suggested cities. |
| TSP-style route ordering | PARTIAL | The old nearest-neighbor helper exists, but the new generator uses curated city order. |
| Intercity transport suggestions | PASS | Trips include transport legs with mode, cost, duration, tradeoff, and links. |
| Know-before-you-go panel | PASS | Country notes show visa, health, currency, plug, tipping, and scams. |
| Iconic activity stream | PASS | Each generated city gets an iconic activity. |
| Hidden/local activity stream | PASS | Each generated city gets a hidden activity with confidence and sources. |
| Real sourced web sweep | FAIL | Hidden picks are local fixture logic, not live web research. |
| Activity card details | PASS | Cards show image, fit reason, cost/time metadata, tags, confidence, and sources. |
| Pin/wishlist/veto actions | PASS | Activity buttons tag cards in local state. |

## Itinerary, Booking, and Budget

| Requirement | Status | Notes |
| --- | --- | --- |
| Day slots with fallbacks | PASS | Days include morning/lunch/afternoon/dinner and fallbacks. |
| Opening hours and exact travel-time solver | PARTIAL | Activity hours are stored, but routing/open-hours optimization is not real. |
| Drag-and-drop timeline | FAIL | Timeline editing exists through buttons, but drag-and-drop is not implemented. |
| Map view with pins | PARTIAL | The map panel shows ordered city pins but not a real Leaflet/Mapbox map. |
| Smart replanning buttons | PARTIAL | Chiller, rain backup, and live replanning work locally for scoped changes. |
| Conflict detection | PASS | Utility exists, is tested, and itinerary warnings surface conflicts. |
| Flight search interface | PARTIAL | Flight picks and provider interfaces exist; live search is not connected. |
| Hotel search interface | PARTIAL | Hotel picks and provider interfaces exist; live search is not connected. |
| Pin flight/hotel options | PASS | Flight and hotel cards can be pinned in local state. |
| Budget engine | PASS | Budget totals, status, and trims are implemented and tested. |

## Export, Dashboard, and In-Trip

| Requirement | Status | Notes |
| --- | --- | --- |
| Google Calendar export | PARTIAL | Mock endpoint returns event payloads; OAuth write is not implemented. |
| ICS export | PASS | ICS download works and is tested. |
| PDF export | PARTIAL | Print-to-PDF is wired through browser print, not a generated PDF file. |
| Shareable read-only link | PARTIAL | `/share/[slug]` works for the demo trip; persistence/expiry is not implemented. |
| Collaborator invites | PARTIAL | Local invite UI exists; email delivery and permissions need backend work. |
| Mobile handoff/offline cache | FAIL | Not implemented. |
| Saved trips dashboard | PARTIAL | `/dashboard` shows the demo trip; real saved trips require persistence/auth. |
| Documents tab/upload | PARTIAL | Local document listing works; encrypted storage is not implemented. |
| Packing list | PASS | Packing list is generated and checkable. |
| Memories view | PASS | A simple local journal panel is implemented. |
| Live today mode | PARTIAL | Today panel shows next item, phrase, weather backup, and local replan action. |
| Push notifications | PARTIAL | Browser notification permission and a test reminder are wired; real scheduled reminders need workers. |

## Platform

| Requirement | Status | Notes |
| --- | --- | --- |
| Mobile-first responsive UI | PARTIAL | Layout is responsive, but not fully device-tested. |
| Light and dark mode | PARTIAL | A dark toggle exists, but some cards still use fixed light surfaces. |
| Loading/error states | PARTIAL | Progress states exist, but provider error states are limited. |
| Accessibility basics | PARTIAL | Semantic HTML and labels exist in main flows; full WCAG audit is not done. |
| Cache windows | PASS | Cache window constants are defined. |
| Background jobs | PARTIAL | BullMQ worker skeleton exists; real jobs are not scheduled. |
| Rate limits | PASS | Token bucket helper is implemented and tested. |
| Docker-first setup | PASS | Dockerfile and Compose are present. |
| Tests and CI | PASS | Unit/component/integration tests pass locally; GitHub CI was previously green. |
