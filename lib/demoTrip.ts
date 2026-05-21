import type { Trip } from "@/types/trip";

export const demoTrip: Trip = {
  id: "demo-sea",
  name: "Southeast Asia November Loop",
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
};
