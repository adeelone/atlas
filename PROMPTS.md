# Prompts

Prompt files are in `prompts/`. I kept them outside the code because prompt changes are easier to review when they are plain text.

## `extract_intent`

Turns the user's free text into `TripIntent`.

Inputs: user text, locale, current date.

Output: destination, dates, duration, party size, budget, interests, pace, lodging style, dietary needs, accessibility needs, and no-go list.

## `allocate_cities`

Chooses cities and nights for the trip.

Inputs: intent, duration, destination scope, pace.

Output: city list with nights, coordinates, and a short reason.

## `discover_activities`

Finds iconic and hidden activity ideas.

Inputs: city, dates, interests, pace, constraints.

Output: activity cards with fit reasoning, cost, timing, tags, and sources.

## `schedule_day`

Builds the morning/midday/lunch/afternoon/dinner/evening slots.

Inputs: day, city, anchors, activities, opening hours, weather.

Output: scheduled slots with fallbacks.

## `replan`

Regenerates part of the trip while keeping locked anchors fixed.

## `parse_pasted_link`

Extracts anchors from pasted confirmations, links, OCR text, or ICS content.
