import { buildPackingList } from "@/lib/packing/rules";
import type {
  Activity,
  Anchor,
  BudgetSummary,
  CityStay,
  FlightPick,
  HotelPick,
  KnowBeforeYouGo,
  Pace,
  TransportLeg,
  Trip,
  TripDay,
  TripIntent
} from "@/types/trip";

const citySets: Record<string, CityStay[]> = {
  japan: [
    { city: "Tokyo", country: "Japan", nights: 4, reason: "Food, transit, photography, and the easiest arrival city.", location: { lat: 35.6762, lon: 139.6503 } },
    { city: "Hakone", country: "Japan", nights: 2, reason: "Onsen break and slower mountain scenery between bigger cities.", location: { lat: 35.2324, lon: 139.1069 } },
    { city: "Kyoto", country: "Japan", nights: 4, reason: "Shrines, quiet lanes, day trips, and classic first-Japan sights.", location: { lat: 35.0116, lon: 135.7681 } }
  ],
  "southeast asia": [
    { city: "Chiang Mai", country: "Thailand", nights: 4, reason: "Food, jungle access, temples, and a gentler start.", location: { lat: 18.7883, lon: 98.9853 } },
    { city: "Hoi An", country: "Vietnam", nights: 4, reason: "Markets, old town walks, beaches, and cooking classes.", location: { lat: 15.8801, lon: 108.338 } },
    { city: "Bangkok", country: "Thailand", nights: 3, reason: "Flight access, street food, and a strong final city.", location: { lat: 13.7563, lon: 100.5018 } }
  ],
  default: [
    { city: "Lisbon", country: "Portugal", nights: 3, reason: "Easy arrival city with food, viewpoints, and transit.", location: { lat: 38.7223, lon: -9.1393 } },
    { city: "Porto", country: "Portugal", nights: 3, reason: "Compact second city with slower evenings and river walks.", location: { lat: 41.1579, lon: -8.6291 } }
  ]
};

export function extractIntent(text: string): TripIntent {
  const lower = text.toLowerCase();
  const durationMatch = lower.match(/(\d+)\s*(day|days|week|weeks)/);
  const rawDuration = durationMatch ? Number(durationMatch[1]) : 7;
  const durationDays = durationMatch?.[2].startsWith("week") ? rawDuration * 7 : rawDuration;
  const budgetMatch = lower.match(/\$([0-9,]+)/);
  const destination = lower.includes("japan") ? "Japan" : lower.includes("asia") ? "Southeast Asia" : lower.includes("portugal") ? "Portugal" : "Open destination";
  const interests = ["hiking", "ramen", "food", "photography", "temples", "beaches", "jungle", "museums"].filter((word) => lower.includes(word));

  return {
    destinations: [destination],
    dateWindow: lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)[^\.,]*/i)?.[0] ?? "Flexible dates",
    durationDays,
    partySize: Number(lower.match(/(\d+)\s*(people|travelers|adults)/)?.[1] ?? 2),
    budgetTier: lower.includes("cheap") || lower.includes("budget") ? "shoestring" : lower.includes("luxury") || lower.includes("premium") ? "premium" : "mid",
    budgetCapUsd: budgetMatch ? Number(budgetMatch[1].replace(",", "")) : 3500,
    interests: interests.length > 0 ? interests : ["food", "walking", "culture"],
    pace: lower.includes("chill") ? "chill" : lower.includes("packed") ? "packed" : "balanced",
    lodgingStyle: lower.includes("hostel") ? "hostel" : lower.includes("luxury") ? "luxury hotel" : "boutique hotel",
    dietaryRestrictions: lower.includes("vegetarian") ? ["vegetarian"] : [],
    accessibilityNeeds: lower.includes("wheelchair") ? ["wheelchair access"] : [],
    noGoList: lower.includes("no nightclubs") || lower.includes("hate crowds") ? ["nightclubs", "peak crowds"].filter((item) => lower.includes(item.split(" ")[0]) || item === "peak crowds") : []
  };
}

export function createTripFromText(text: string, anchors: Anchor[] = []): Trip {
  return createTrip(extractIntent(text), anchors);
}

export function createTrip(intent: TripIntent, anchors: Anchor[] = []): Trip {
  const key = intent.destinations.join(" ").toLowerCase();
  const baseCities = key.includes("japan") ? citySets.japan : key.includes("asia") ? citySets["southeast asia"] : citySets.default;
  const cities = spreadNights(baseCities, intent.durationDays);
  const transport = makeTransport(cities);
  const activities = makeActivities(cities, intent);
  const days = makeDays(cities, activities, anchors, intent.pace);
  const flights = makeFlights(intent, cities);
  const hotels = makeHotels(cities, intent);
  const budget = makeBudget(intent, cities, flights, hotels, transport, activities);
  const countryNotes = makeCountryNotes(cities);
  const destinationName = intent.destinations[0] ?? "Trip";

  return {
    id: `trip-${Date.now()}`,
    name: `${destinationName} ${intent.durationDays}-Day Draft`,
    status: "upcoming",
    heroImageUrl: heroFor(destinationName),
    intent,
    cities,
    transport,
    flights,
    hotels,
    knowBeforeYouGo: countryNotes,
    anchors,
    activities,
    days,
    budget,
    packing: buildPackingList(intent),
    documents: [],
    shareSlug: slugify(`${destinationName}-${intent.durationDays}-day-draft`)
  };
}

function spreadNights(cities: CityStay[], days: number): CityStay[] {
  const copy = cities.map((city) => ({ ...city }));
  let nightsLeft = Math.max(days - 1, copy.length);
  for (const city of copy) {
    city.nights = 1;
    nightsLeft -= 1;
  }
  let idx = 0;
  while (nightsLeft > 0) {
    copy[idx % copy.length].nights += 1;
    idx += 1;
    nightsLeft -= 1;
  }
  return copy;
}

function makeTransport(cities: CityStay[]): TransportLeg[] {
  return cities.slice(0, -1).map((city, idx) => {
    const next = cities[idx + 1];
    const longLeg = Math.abs(city.location.lon - next.location.lon) > 8 || Math.abs(city.location.lat - next.location.lat) > 6;
    return {
      from: city.city,
      to: next.city,
      mode: longLeg ? "flight" : "train",
      durationHours: longLeg ? 3.5 + idx : 2.2 + idx,
      costUsd: longLeg ? 120 + idx * 30 : 45 + idx * 15,
      tradeoff: longLeg ? "Fastest option and worth it for this route." : "Slower than flying, but easier and usually more scenic.",
      bookingUrl: longLeg ? "https://www.google.com/travel/flights" : "https://www.rome2rio.com"
    };
  });
}

function makeActivities(cities: CityStay[], intent: TripIntent): Activity[] {
  return cities.flatMap((city, idx) => [
    {
      id: `iconic-${slugify(city.city)}`,
      name: iconicName(city.city),
      city: city.city,
      stream: "iconic",
      imageUrl: heroFor(city.city),
      description: `The classic first-visit stop in ${city.city}, timed to avoid the worst crowds.`,
      whyFits: `It covers the must-see list while leaving room for ${intent.interests[0] ?? "wandering"}.`,
      estimatedMinutes: 150,
      costRangeUsd: [10, 35],
      bookingRequired: idx % 2 === 0,
      bestTime: "early morning",
      crowdLevel: "high",
      tags: ["iconic", "outdoor", "photo-friendly"],
      confidence: 0.93,
      sourceAttribution: ["Official tourism board", "Major guidebooks"],
      location: city.location,
      bookingUrl: "https://www.getyourguide.com",
      openingHours: "09:00-17:00",
      seasonHint: "Weekdays are usually easier."
    },
    {
      id: `hidden-${slugify(city.city)}`,
      name: hiddenName(city.city),
      city: city.city,
      stream: "hidden",
      imageUrl: heroFor(city.country),
      description: `A quieter local pick in ${city.city} that fits between bigger stops.`,
      whyFits: `Picked for ${intent.interests.join(", ")} and a ${intent.pace} pace.`,
      estimatedMinutes: 90,
      costRangeUsd: [0, 18],
      bookingRequired: false,
      bestTime: "late afternoon",
      crowdLevel: "low",
      tags: ["hidden", "local", "walkable"],
      confidence: 0.78,
      sourceAttribution: ["Local blogs", "Traveler forum samples"],
      location: { lat: city.location.lat + 0.015, lon: city.location.lon + 0.015 },
      bookingUrl: "https://www.viator.com",
      openingHours: "Varies",
      seasonHint: "Best with dry weather."
    }
  ]);
}

function makeDays(cities: CityStay[], activities: Activity[], anchors: Anchor[], pace: Pace): TripDay[] {
  const start = new Date("2026-11-03T09:00:00");
  const slots = pace === "packed" ? ["morning", "midday", "lunch", "afternoon", "dinner", "evening"] : ["morning", "lunch", "afternoon", "dinner"];
  const days: TripDay[] = [];
  let dayIndex = 0;

  for (const city of cities) {
    for (let i = 0; i < city.nights; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + dayIndex);
      const isoDate = date.toISOString().slice(0, 10);
      const cityActivities = activities.filter((activity) => activity.city === city.city);
      const isTravelDay = i === 0 && dayIndex > 0;
      const isLowDay = dayIndex === 0 || isTravelDay || (dayIndex > 0 && dayIndex % 5 === 0);
      days.push({
        date: isoDate,
        city: city.city,
        energy: isLowDay ? "low" : pace === "packed" ? "high" : "normal",
        slots: slots.map((slot, idx) => {
          const hour = slotHour(slot);
          const activity = cityActivities[idx % cityActivities.length];
          const anchor = anchors.find((item) => item.startsAt.startsWith(isoDate));
          if (idx === 0 && anchor) {
            return {
              name: slot as TripDay["slots"][number]["name"],
              primary: {
                id: anchor.id,
                title: anchor.title,
                kind: "anchor",
                startsAt: anchor.startsAt,
                endsAt: anchor.endsAt,
                location: anchor.location,
                locked: anchor.locked,
                notes: anchor.confirmationCode ? `Confirmation ${anchor.confirmationCode}` : undefined,
                costUsd: anchor.costUsd
              }
            };
          }
          return {
            name: slot as TripDay["slots"][number]["name"],
            primary: {
              id: `${slugify(city.city)}-${isoDate}-${slot}`,
              title: titleForSlot(slot, activity?.name, isTravelDay),
              kind: slot === "lunch" || slot === "dinner" ? "meal" : isTravelDay && slot === "morning" ? "transport" : "activity",
              startsAt: `${isoDate}T${String(hour).padStart(2, "0")}:00:00`,
              endsAt: `${isoDate}T${String(hour + 2).padStart(2, "0")}:00:00`,
              location: city.city,
              costUsd: slot === "lunch" || slot === "dinner" ? 24 : activity?.costRangeUsd[1] ?? 0,
              fallback: slot === "afternoon" ? "Swap to an indoor cafe, gallery, or market if rain hits." : undefined
            }
          };
        })
      });
      dayIndex += 1;
    }
  }

  return days;
}

function makeFlights(intent: TripIntent, cities: CityStay[]): FlightPick[] {
  const first = cities[0];
  const last = cities[cities.length - 1];
  return [
    {
      id: "flight-main",
      route: `Home - ${first.city} / ${last.city} - Home`,
      provider: "Google Flights",
      priceUsd: intent.budgetTier === "premium" ? 1600 : intent.budgetTier === "shoestring" ? 780 : 1150,
      durationMinutes: 920,
      stops: 1,
      deepLink: "https://www.google.com/travel/flights",
      pinned: false
    }
  ];
}

function makeHotels(cities: CityStay[], intent: TripIntent): HotelPick[] {
  const base = intent.budgetTier === "premium" ? 210 : intent.budgetTier === "shoestring" ? 55 : 115;
  return cities.map((city, idx) => ({
    id: `hotel-${slugify(city.city)}`,
    city: city.city,
    provider: idx % 2 === 0 ? "Booking.com" : "Hotels.com",
    name: `${city.city} ${intent.lodgingStyle}`,
    nightlyUsd: base + idx * 15,
    rating: 4.4 + (idx % 3) * 0.1,
    neighborhood: idx === 0 ? "central but quiet" : "walkable transit area",
    refundable: true,
    deepLink: idx % 2 === 0 ? "https://www.booking.com" : "https://www.hotels.com",
    pinned: false
  }));
}

function makeBudget(intent: TripIntent, cities: CityStay[], flights: FlightPick[], hotels: HotelPick[], transport: TransportLeg[], activities: Activity[]): BudgetSummary {
  const lodging = hotels.reduce((sum, hotel, idx) => sum + hotel.nightlyUsd * cities[idx].nights, 0);
  return {
    capUsd: intent.budgetCapUsd ?? 3500,
    categories: {
      flights: flights.reduce((sum, flight) => sum + flight.priceUsd, 0),
      lodging,
      intercity: transport.reduce((sum, leg) => sum + leg.costUsd, 0),
      activities: activities.reduce((sum, activity) => sum + activity.costRangeUsd[1], 0),
      food: cities.reduce((sum, city) => sum + city.nights * (intent.budgetTier === "premium" ? 80 : intent.budgetTier === "shoestring" ? 28 : 48), 0),
      transit: cities.reduce((sum, city) => sum + city.nights * 12, 0),
      buffer: Math.round((intent.budgetCapUsd ?? 3500) * 0.08)
    }
  };
}

function makeCountryNotes(cities: CityStay[]): KnowBeforeYouGo[] {
  const seen = new Set<string>();
  return cities
    .filter((city) => {
      if (seen.has(city.country)) return false;
      seen.add(city.country);
      return true;
    })
    .map((city) => ({
      country: city.country,
      visa: city.country === "Vietnam" ? "US travelers usually need an e-visa before arrival." : "Check the official entry rules before booking.",
      health: "Routine vaccines and basic food/water care are the main starting point.",
      currency: currencyFor(city.country),
      plug: city.country === "Japan" ? "Type A/B" : "Type A/C/F are common in many places.",
      tipping: city.country === "Japan" ? "Tipping is not expected." : "Small tips are appreciated for guides and drivers.",
      scams: "Use official taxis or apps, confirm prices, and ignore too-good-to-be-true detours."
    }));
}

function slotHour(slot: string): number {
  return { morning: 9, midday: 11, lunch: 12, afternoon: 15, dinner: 19, evening: 21 }[slot] ?? 9;
}

function titleForSlot(slot: string, activityName = "Neighborhood walk", isTravelDay: boolean): string {
  if (isTravelDay && slot === "morning") return "Intercity transfer and check-in buffer";
  if (slot === "lunch") return "Local lunch stop";
  if (slot === "dinner") return "Dinner reservation window";
  return activityName;
}

function iconicName(city: string): string {
  if (city === "Kyoto") return "Fushimi Inari early gates";
  if (city === "Tokyo") return "Asakusa and river walk";
  if (city === "Bangkok") return "Grand Palace and Wat Phra Kaew";
  if (city === "Chiang Mai") return "Doi Suthep morning visit";
  return `${city} old town highlights`;
}

function hiddenName(city: string): string {
  if (city === "Kyoto") return "Philosopher's Path side temples";
  if (city === "Tokyo") return "Yanaka backstreet photo walk";
  if (city === "Hoi An") return "Market breakfast walk";
  if (city === "Chiang Mai") return "Wat Pha Lat forest temple";
  return `${city} local neighborhood loop`;
}

function heroFor(place: string): string {
  const lower = place.toLowerCase();
  if (lower.includes("japan") || lower.includes("tokyo") || lower.includes("kyoto")) return "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80";
  if (lower.includes("asia") || lower.includes("thai") || lower.includes("vietnam")) return "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80";
  return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";
}

function currencyFor(country: string): string {
  if (country === "Japan") return "Japanese yen";
  if (country === "Thailand") return "Thai baht";
  if (country === "Vietnam") return "Vietnamese dong";
  return "Local currency";
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
