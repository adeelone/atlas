"use client";

import { Wand2 } from "lucide-react";
import { useState } from "react";

const steps = ["Destination", "Dates", "Cities", "Interests", "Budget", "Pace", "Companions"];

export function Wizard() {
  const [step, setStep] = useState(0);
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
          <input id="wizard-input" className="mt-2 w-full rounded-lg border border-black/10 p-3" placeholder="Type a preference or leave it to Atlas" />
          <button className="mt-3 inline-flex items-center gap-2 rounded-lg bg-atlas-clay px-4 py-2 text-sm font-semibold text-white" type="button">
            <Wand2 size={16} /> Decide for me
          </button>
        </div>
        <aside className="rounded-lg bg-atlas-mist p-4 text-sm leading-6">
          <strong>Mini itinerary</strong>
          <p className="mt-2">3 cities, 12 days, balanced pace, two low-energy buffers, food and quiet photo walks prioritized.</p>
        </aside>
      </div>
    </section>
  );
}
