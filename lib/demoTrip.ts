import type { Trip } from "@/types/trip";

export const demoTrip: Trip = {
  id: "demo-sea",
  name: "Southeast Asia November Loop",
  status: "upcoming",
  heroImageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
  intent: {
    destinations: ["Thailand", "Vietnam"],
    dateWindow: "November 2026",
    durationDays: 12,
    partySize: 2,
    budgetTier: "mid",
    budgetCapUsd: 4200,
    interests: ["food", "jungle", "photography", "quiet temples"],
    pace: "balanced",
    lodgingStyle: "small boutique hotels",
    dietaryRestrictions: [],
    accessibilityNeeds: [],
    noGoList: ["nightclubs"]
  },
  cities: [
    {
      city: "Chiang Mai",
      country: "Thailand",
      nights: 4,
      reason: "Food, quiet temples, jungle day trips, and a softer landing day.",
      location: { lat: 18.7883, lon: 98.9853 }
    },
    {
      city: "Hoi An",
      country: "Vietnam",
      nights: 4,
      reason: "Walkable old town, cooking classes, lantern evenings, and beach buffer time.",
      location: { lat: 15.8801, lon: 108.338 }
    },
    {
      city: "Bangkok",
      country: "Thailand",
      nights: 4,
      reason: "Best flight access, big food range, and an easy place to close the loop.",
      location: { lat: 13.7563, lon: 100.5018 }
    }
  ],
  transport: [
    {
      from: "Chiang Mai",
      to: "Hoi An",
      mode: "flight",
      durationHours: 4.5,
      costUsd: 115,
      tradeoff: "Fastest option; train/bus would eat a full day.",
      bookingUrl: "https://www.google.com/travel/flights"
    },
    {
      from: "Hoi An",
      to: "Bangkok",
      mode: "flight",
      durationHours: 3.7,
      costUsd: 140,
      tradeoff: "Keeps the last travel day short before the return flight.",
      bookingUrl: "https://www.google.com/travel/flights"
    }
  ],
  flights: [
    {
      id: "flight-demo-1",
      route: "Home - Chiang Mai / Bangkok - Home",
      provider: "Google Flights",
      priceUsd: 1450,
      durationMinutes: 1040,
      stops: 1,
      deepLink: "https://www.google.com/travel/flights",
      pinned: false
    }
  ],
  hotels: [
    {
      id: "hotel-cnx",
      city: "Chiang Mai",
      provider: "Booking.com",
      name: "Old City Garden House",
      nightlyUsd: 92,
      rating: 4.6,
      neighborhood: "Old City edge",
      refundable: true,
      deepLink: "https://www.booking.com",
      pinned: false
    },
    {
      id: "hotel-han",
      city: "Hoi An",
      provider: "Hotels.com",
      name: "Lantern Courtyard Stay",
      nightlyUsd: 105,
      rating: 4.7,
      neighborhood: "Cam Pho",
      refundable: true,
      deepLink: "https://www.hotels.com",
      pinned: false
    },
    {
      id: "hotel-bkk",
      city: "Bangkok",
      provider: "Expedia",
      name: "Riverside Transit Hotel",
      nightlyUsd: 128,
      rating: 4.5,
      neighborhood: "Sathorn",
      refundable: true,
      deepLink: "https://www.expedia.com",
      pinned: false
    }
  ],
  knowBeforeYouGo: [
    {
      country: "Thailand",
      visa: "US travelers usually get a short visa-exempt stay, but check official rules before booking.",
      health: "Routine vaccines plus mosquito precautions are sensible.",
      currency: "Thai baht",
      plug: "Types A, B, C, F and O are common.",
      tipping: "Small tips are appreciated but not required everywhere.",
      scams: "Watch for closed-temple claims and overpriced tuk-tuk detours."
    },
    {
      country: "Vietnam",
      visa: "US travelers usually need an e-visa before arrival.",
      health: "Routine vaccines and food/water care are the big basics.",
      currency: "Vietnamese dong",
      plug: "Types A, C and F are common.",
      tipping: "Not mandatory, but small tips for guides and drivers are common.",
      scams: "Confirm taxi apps and prices before riding."
    }
  ],
  anchors: [
    {
      id: "anchor-flight-home",
      title: "Return flight from Bangkok",
      startsAt: "2026-11-14T21:10:00+07:00",
      endsAt: "2026-11-14T23:50:00+07:00",
      location: "BKK",
      source: "pasted email",
      confirmationCode: "ATLAS6",
      locked: true
    }
  ],
  activities: [
    {
      id: "act-chiang-rai",
      name: "Wat Pha Lat forest temple",
      city: "Chiang Mai",
      stream: "hidden",
      imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=900&q=80",
      description: "A quiet temple walk tucked into the mountain road above the old city.",
      whyFits: "Matches the quiet shrine and photography preferences without the peak crowd profile.",
      estimatedMinutes: 120,
      costRangeUsd: [0, 8],
      bookingRequired: false,
      bestTime: "early morning",
      crowdLevel: "low",
      tags: ["hidden", "outdoor", "weather-dependent"],
      confidence: 0.82,
      sourceAttribution: ["Local guide notes", "Open travel forums"],
      location: { lat: 18.7987, lon: 98.9421 }
    },
    {
      id: "act-grand-palace",
      name: "Grand Palace and Wat Phra Kaew",
      city: "Bangkok",
      stream: "iconic",
      imageUrl: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=900&q=80",
      description: "Bangkok's classic temple and palace stop, best done early before tour buses peak.",
      whyFits: "It covers the iconic checklist without taking the whole day.",
      estimatedMinutes: 150,
      costRangeUsd: [15, 25],
      bookingRequired: false,
      bestTime: "early morning",
      crowdLevel: "high",
      tags: ["iconic", "outdoor", "temple"],
      confidence: 0.95,
      sourceAttribution: ["Official tourism board", "Major guidebooks"],
      location: { lat: 13.7515, lon: 100.4927 },
      bookingUrl: "https://www.royalgrandpalace.th/en/home",
      openingHours: "08:30-15:30",
      seasonHint: "Dry season mornings are easier."
    },
    {
      id: "act-hoi-an-food",
      name: "Hoi An market breakfast walk",
      city: "Hoi An",
      stream: "hidden",
      imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80",
      description: "A low-key food walk through market stalls before the old town gets crowded.",
      whyFits: "Food-focused and better for photography before the midday heat.",
      estimatedMinutes: 90,
      costRangeUsd: [8, 18],
      bookingRequired: false,
      bestTime: "breakfast",
      crowdLevel: "medium",
      tags: ["hidden", "food", "outdoor"],
      confidence: 0.78,
      sourceAttribution: ["Local blogs", "Food tour samples"],
      location: { lat: 15.8794, lon: 108.335 },
      bookingUrl: "https://www.getyourguide.com/hoi-an-l831/",
      openingHours: "06:00-10:00",
      seasonHint: "Go early during hot months."
    }
  ],
  days: [
    {
      date: "2026-11-03",
      city: "Chiang Mai",
      energy: "low",
      slots: [
        {
          name: "morning",
          primary: {
            id: "slot-arrive",
            title: "Arrival buffer and old city walk",
            kind: "buffer",
            startsAt: "2026-11-03T09:30:00+07:00",
            endsAt: "2026-11-03T11:30:00+07:00",
            location: "Chiang Mai Old City",
            notes: "Keep this light for jet lag and hotel drop-off."
          }
        },
        {
          name: "lunch",
          primary: {
            id: "slot-khao-soi",
            title: "Khao soi lunch near Nimman",
            kind: "meal",
            startsAt: "2026-11-03T12:15:00+07:00",
            endsAt: "2026-11-03T13:15:00+07:00",
            location: "Nimman, Chiang Mai",
            costUsd: 18
          }
        },
        {
          name: "afternoon",
          primary: {
            id: "slot-temple",
            title: "Wat Pha Lat forest temple",
            kind: "activity",
            startsAt: "2026-11-03T15:00:00+07:00",
            endsAt: "2026-11-03T17:00:00+07:00",
            location: "Wat Pha Lat",
            fallback: "Lanna Folklife Museum if rain arrives."
          }
        }
      ]
    }
  ],
  budget: {
    capUsd: 4200,
    categories: {
      flights: 1450,
      lodging: 1320,
      intercity: 280,
      activities: 420,
      food: 560,
      transit: 180,
      buffer: 300
    }
  },
  packing: ["Light rain shell", "Temple-ready shoulder cover", "Outlet adapter", "Small dry bag", "Motion sickness tablets"]
  ,
  documents: [],
  shareSlug: "southeast-asia-november-loop"
};
