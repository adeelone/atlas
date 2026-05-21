# Providers

This file tracks the provider order I would try first. The app should still work when these are missing, so the default code uses mock data.

## Flights

Order to try:

1. Kiwi / Tequila
2. Skyscanner
3. Duffel
4. Amadeus self-service
5. Aviasales

Real flight inventory usually needs paid access or approval. Keep those integrations behind `ENABLE_PAID_PROVIDERS`.

## Hotels

Order to try:

1. Booking.com
2. Hotels.com
3. Expedia
4. Hotellook

Hotel results should show price, rating, refundable status, neighborhood, and a link out.

## Activities

Use official attraction sites first when possible. Then add sources like Viator, GetYourGuide, Atlas Obscura-style hidden picks, and local event listings.

Hidden picks need a confidence score and source names because they are easier to get wrong.

## Weather

Open-Meteo is the free default. Cache it for an hour.

## Geocoding and maps

Nominatim is the free fallback for geocoding. Be gentle with rate limits. Mapbox can be added later with `MAPBOX_TOKEN`.

## ToS notes

Prefer official APIs. If a source only works through page-level collection, treat it as best effort, cache it, rate-limit it, and check the provider terms before turning it on.
