# How It Works

These are my notes for the app shape.

## Main model

The app mostly revolves around this chain:

```text
Trip -> Day -> Slot -> Item
```

There are also `Anchor` objects for stuff the traveler already booked. Those are marked as locked so the planner can schedule around them without moving them by accident.

Activities are separate from scheduled items at first. That lets the app show options, alternatives, and wishlisted ideas before everything is placed on a day.

## Planning flow

1. Take input from chat, the wizard, or pasted booking text.
2. Turn it into `TripIntent`.
3. Pick cities and divide up the nights.
4. Order the cities so the route does not bounce around too much.
5. Pull activity ideas from providers.
6. Build day slots around anchors, meals, travel time, and lighter days.
7. Show the result in the editor.
8. Export it to ICS, and later Google Calendar/PDF.

## LLMs

All LLM calls go through `LLMProvider`. The current provider is fake on purpose. It makes tests and local development boring, which is good here.

Prompt templates live in `prompts/` so they are easy to review and change.

## Providers

Flights, hotels, activities, maps, weather, and geocoding all have small interfaces. The first version returns fixture-like data. Real providers should fit behind the same interfaces.

## Anchors and replanning

The main rule is: locked anchors do not move unless the user unlocks them. A replan operation should patch only the requested part of the trip and then run conflict checks.

## Caching and jobs

The cache windows live in `lib/config.ts`:

- flights: 1 hour
- hotels: 6 hours
- activities: 24 hours
- weather: 1 hour
- geocoding: 30 days

Redis is for cache and BullMQ jobs. Jobs would handle slower work like price refreshes, reminders, and trip regeneration.
