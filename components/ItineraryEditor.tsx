import { CalendarDays, CloudRain, Lock, RefreshCcw } from "lucide-react";
import type { Trip } from "@/types/trip";

export function ItineraryEditor({ trip }: { trip: Trip }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-atlas-tide">Itinerary</p>
          <h2 className="text-3xl font-semibold">{trip.name}</h2>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-black/10 p-2" aria-label="Regenerate this day" type="button"><RefreshCcw size={18} /></button>
          <button className="rounded-lg border border-black/10 p-2" aria-label="Swap to indoor" type="button"><CloudRain size={18} /></button>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {trip.days.map((day) => (
          <article key={day.date} className="rounded-lg border border-black/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays size={18} />
              <h3 className="font-semibold">{day.date} · {day.city}</h3>
              <span className="ml-auto rounded-full bg-atlas-mist px-3 py-1 text-xs">{day.energy} energy</span>
            </div>
            <div className="grid gap-3">
              {day.slots.map((slot) => (
                <div key={slot.name} className="grid gap-2 rounded-lg bg-atlas-mist p-3 md:grid-cols-[120px_1fr]">
                  <span className="text-sm font-semibold capitalize text-atlas-tide">{slot.name}</span>
                  <div>
                    <p className="font-medium">{slot.primary?.title ?? "Open slot"}</p>
                    <p className="text-sm text-black/60">{slot.primary?.location}</p>
                    {slot.primary?.fallback ? <p className="mt-1 text-sm text-atlas-clay">Fallback: {slot.primary.fallback}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
        {trip.anchors.map((anchor) => (
          <div key={anchor.id} className="flex items-center gap-3 rounded-lg border border-atlas-sun/40 bg-atlas-sun/10 p-3 text-sm">
            <Lock size={16} /> Locked anchor: {anchor.title}
          </div>
        ))}
      </div>
    </section>
  );
}
