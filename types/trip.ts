export type Pace = "chill" | "balanced" | "packed";
export type BudgetTier = "shoestring" | "mid" | "premium";
export type ActivityStream = "iconic" | "hidden";
export type SlotName = "morning" | "midday" | "lunch" | "afternoon" | "dinner" | "evening";

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface TripIntent {
  destinations: string[];
  dateWindow: string;
  durationDays: number;
  partySize: number;
  budgetTier: BudgetTier;
  budgetCapUsd?: number;
  interests: string[];
  pace: Pace;
  lodgingStyle: string;
  dietaryRestrictions: string[];
  accessibilityNeeds: string[];
  noGoList: string[];
}

export interface Anchor {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  location: string;
  costUsd?: number;
  confirmationCode?: string;
  source: string;
  locked: boolean;
}

export interface Activity {
  id: string;
  name: string;
  city: string;
  stream: ActivityStream;
  imageUrl: string;
  description: string;
  whyFits: string;
  estimatedMinutes: number;
  costRangeUsd: [number, number];
  bookingRequired: boolean;
  bestTime: string;
  crowdLevel: "low" | "medium" | "high";
  tags: string[];
  confidence: number;
  sourceAttribution: string[];
  location: GeoPoint;
}

export interface ItineraryItem {
  id: string;
  title: string;
  kind: "flight" | "hotel" | "transport" | "activity" | "meal" | "buffer" | "anchor";
  startsAt: string;
  endsAt: string;
  location: string;
  notes?: string;
  costUsd?: number;
  locked?: boolean;
  externalUrl?: string;
  fallback?: string;
}

export interface DaySlot {
  name: SlotName;
  primary?: ItineraryItem;
  fallback?: ItineraryItem;
}

export interface TripDay {
  date: string;
  city: string;
  energy: "low" | "normal" | "high";
  slots: DaySlot[];
}

export interface BudgetSummary {
  capUsd: number;
  categories: Record<string, number>;
}

export interface Trip {
  id: string;
  name: string;
  heroImageUrl: string;
  intent: TripIntent;
  anchors: Anchor[];
  activities: Activity[];
  days: TripDay[];
  budget: BudgetSummary;
  packing: string[];
}
