"use client";

import { useMemo, useState } from "react";
import { AnchorPaster } from "@/components/AnchorPaster";
import { BudgetPanel } from "@/components/BudgetPanel";
import { ChatPlanner } from "@/components/ChatPlanner";
import { CollaboratorsPanel } from "@/components/CollaboratorsPanel";
import { DocumentsPanel } from "@/components/DocumentsPanel";
import { ExportPanel } from "@/components/ExportPanel";
import { ItineraryEditor } from "@/components/ItineraryEditor";
import { KnowBeforePanel } from "@/components/KnowBeforePanel";
import { LiveToday } from "@/components/LiveToday";
import { MapView } from "@/components/MapView";
import { MemoriesPanel } from "@/components/MemoriesPanel";
import { PackingList } from "@/components/PackingList";
import { TripDashboard } from "@/components/TripDashboard";
import { TravelOptionsPanel } from "@/components/TravelOptionsPanel";
import { Wizard } from "@/components/Wizard";
import { demoTrip } from "@/lib/demoTrip";
import { createTrip, createTripFromText } from "@/lib/planner/createTrip";
import type { Anchor, Trip, TripIntent, UploadedDocument } from "@/types/trip";

export function AtlasApp() {
  const [trip, setTrip] = useState<Trip>(demoTrip);
  const [messages, setMessages] = useState<string[]>(["Demo trip loaded. Generate a new one from chat, builder, or anchors."]);
  const [dark, setDark] = useState(false);

  const nextDay = useMemo(() => trip.days[0], [trip.days]);

  function planFromText(text: string) {
    const next = createTripFromText(text, trip.anchors);
    setTrip(next);
    setMessages([
      "Intent parsed from your prompt.",
      `Allocated ${next.cities.length} cities across ${next.intent.durationDays} days.`,
      `Found ${next.activities.length} iconic and hidden ideas.`,
      "Built a scheduled draft with flights, hotels, budget, packing, and exports."
    ]);
  }

  function planFromIntent(intent: TripIntent) {
    const next = createTrip(intent, trip.anchors);
    setTrip(next);
    setMessages(["Builder choices applied.", "Trip regenerated around any locked anchors."]);
  }

  function addAnchors(anchors: Anchor[]) {
    setTrip((current) => {
      const existing = new Set(current.anchors.map((anchor) => anchor.id));
      const merged = [...current.anchors, ...anchors.filter((anchor) => !existing.has(anchor.id))];
      return createTrip(current.intent, merged);
    });
    setMessages([`${anchors.length} locked anchor${anchors.length === 1 ? "" : "s"} added.`, "Schedule rebuilt around fixed bookings."]);
  }

  function updateTrip(next: Trip) {
    setTrip(next);
  }

  function addDocument(doc: UploadedDocument) {
    setTrip((current) => ({ ...current, documents: [doc, ...current.documents] }));
  }

  return (
    <main className={`min-h-screen ${dark ? "bg-atlas-ink text-atlas-paper" : "bg-atlas-paper text-atlas-ink"}`}>
      <section className="relative overflow-hidden border-b border-black/10 bg-[linear-gradient(120deg,rgba(239,244,241,.94),rgba(251,250,246,.88)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[1.08fr_.92fr] md:px-8 md:py-12">
          <div className="flex min-h-[560px] flex-col justify-between">
            <nav className="flex items-center justify-between">
              <span className="text-xl font-semibold tracking-wide">Atlas</span>
              <div className="flex gap-2 text-sm">
                <a className="rounded-full bg-white/70 px-4 py-2 shadow-sm" href="#builder">Builder</a>
                <a className="rounded-full bg-white/70 px-4 py-2 shadow-sm" href="#trip">Trip</a>
                <button className="rounded-full bg-white/70 px-4 py-2 shadow-sm" onClick={() => setDark((value) => !value)} type="button">{dark ? "Light" : "Dark"}</button>
              </div>
            </nav>
            <div className="max-w-3xl py-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-atlas-tide">AI travel planner</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">Atlas</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-black/70">
                Start with a sentence, a guided form, or bookings you already have. Atlas turns it into one editable trip plan.
              </p>
            </div>
            <TripDashboard trip={trip} />
          </div>
          <ChatPlanner messages={messages} onPlan={planFromText} />
        </div>
      </section>
      <section id="builder" className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-[1fr_.9fr] md:px-8">
        <Wizard onPlan={planFromIntent} />
        <AnchorPaster onAnchors={addAnchors} />
      </section>
      <section id="trip" className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 md:grid-cols-[1.15fr_.85fr] md:px-8">
        <ItineraryEditor trip={trip} onChange={updateTrip} />
        <div className="grid gap-6">
          <MapView trip={trip} />
          <TravelOptionsPanel trip={trip} onChange={updateTrip} />
          <BudgetPanel budget={trip.budget} />
          <KnowBeforePanel notes={trip.knowBeforeYouGo} />
          <ExportPanel trip={trip} />
          <DocumentsPanel documents={trip.documents} onAdd={addDocument} />
          <CollaboratorsPanel />
          <PackingList items={trip.packing} />
          <LiveToday day={nextDay} trip={trip} onChange={updateTrip} />
          <MemoriesPanel trip={trip} />
        </div>
      </section>
    </main>
  );
}
