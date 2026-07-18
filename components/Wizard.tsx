"use client";

import { Wand2 } from "lucide-react";
import { useState } from "react";
import { extractIntent } from "@/lib/planner/createTrip";
import type { TripIntent } from "@/types/trip";

const steps = ["Destination", "Dates", "Cities", "Interests", "Budget", "Pace", "Companions"];

export function Wizard({ onPlan }: { onPlan: (intent: TripIntent) => void }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({
    Destination: "Southeast Asia",
    Dates: "November 2026",
    Cities: "Decide for me",
    Interests: "food, jungle, photography, quiet temples",
    Budget: "$4200",
    Pace: "balanced",
    Companions: "2 adults"
  });

  function update(value: string) {
    setValues((current) => ({ ...current, [steps[step]]: value }));
  }

  function decideForMe() {
    const defaults: Record<string, string> = {
      Destination: "Japan",
      Dates: "late October",
      Cities: "Tokyo, Hakone, Kyoto",
      Interests: "ramen, hiking, quiet shrines, photography",
      Budget: "$4000",
      Pace: "balanced",
      Companions: "2 adults"
    };
    setValues((current) => ({ ...current, [steps[step]]: defaults[steps[step]] }));
  }

  function build() {
    onPlan(extractIntent(`${values.Companions} ${values.Destination} ${values.Dates} ${values.Budget} ${values.Interests} ${values.Pace}`));
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-atlas-tide">Builder</p>
      <h2 className="text-2xl font-semibold">Shape the trip step by step.</h2>
      <div className="mt-5 flex flex-wrap gap-2">
          {steps.map((item, index) => (
          <button key={item} className={`rounded-full px-3 py-2 text-sm ${index === step ? "bg-atlas-ink text-white" : "bg-atlas-mist"}`} onClick={() => setStep(index)} type="button">
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_260px]">
        <div className="rounded-lg border border-black/10 p-4">
          <label className="text-sm font-medium" htmlFor="wizard-input">{steps[step]}</label>
          <input id="wizard-input" className="mt-2 w-full rounded-lg border border-black/10 p-3" value={values[steps[step]] ?? ""} onChange={(event) => update(event.target.value)} placeholder="Type a preference or leave it to Atlas" />
          <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-atlas-clay px-4 py-2 text-sm font-semibold text-white" onClick={decideForMe} type="button">
            <Wand2 size={16} /> Decide for me
          </button>
          <button className="ml-2 mt-3 rounded-lg bg-atlas-ink px-4 py-2 text-sm font-semibold text-white" onClick={build} type="button">
            Build from builder
          </button>
        </div>
        <aside className="rounded-lg bg-atlas-mist p-4 text-sm leading-6">
          <strong>Mini itinerary</strong>
          <p className="mt-2">{values.Destination}, {values.Dates}, {values.Pace} pace. Interests: {values.Interests}.</p>
        </aside>
      </div>
    </section>
  );
}
