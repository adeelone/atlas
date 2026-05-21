# extract_intent

Extract a traveler's free-form request into the `TripIntent` JSON schema.

Inputs: raw user text, locale, current date.

Output: strict JSON with destinations, dateWindow, durationDays, partySize, budgetTier, budgetCapUsd, interests, pace, lodgingStyle, dietaryRestrictions, accessibilityNeeds, noGoList.
