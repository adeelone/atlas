import { CalendarDays, CloudRain, Heart, Lock, Pin, RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import { detectConflicts } from "@/lib/itinerary/conflicts";
import type { Trip } from "@/types/trip";

export function ItineraryEditor({ trip, onChange }: { trip: Trip; onChange: (trip: Trip) => void }) {
  const conflicts = detectConflicts(trip.days.flatMap((day) => day.slots.flatMap((slot) => (slot.primary ? [slot.primary] : []))));
  function makeDayChiller(date?: string) {
    if (!date) return;
    onChange({
      ...trip,
      days: trip.days.map((day) =>
        day.date === date
          ? {
              ...day,
              energy: "low",
              slots: day.slots.filter((slot) => ["morning", "lunch", "afternoon", "dinner"].includes(slot.name))
            }
          : day
      )
    });
  }

  function swapToIndoor(date?: string) {
    if (!date) return;
    onChange({
      ...trip,
      days: trip.days.map((day) =>
        day.date === date
          ? {
              ...day,
              slots: day.slots.map((slot) =>
                slot.name === "afternoon" && slot.primary
                  ? { ...slot, primary: { ...slot.primary, title: "Indoor market, museum, or cafe backup", kind: "activity", fallback: "Original outdoor plan saved as a wishlist idea." } }
                  : slot
              )
            }
          : day
      )
    });
  }

  function tagActivity(id: string, tag: string) {
    onChange({
      ...trip,
      activities: trip.activities.map((activity) => (activity.id === id ? { ...activity, tags: Array.from(new Set([...activity.tags, tag])) } : activity))
    });
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-atlas-tide">Itinerary</p>
          <h2 className="text-3xl font-semibold">{trip.name}</h2>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg border border-black/10 p-2" aria-label="Regenerate this day" onClick={() => makeDayChiller(trip.days[0]?.date)} type="button"><RefreshCcw size={18} /></button>
          <button className="rounded-lg border border-black/10 p-2" aria-label="Swap to indoor" onClick={() => swapToIndoor(trip.days[0]?.date)} type="button"><CloudRain size={18} /></button>
        </div>
      </div>
      <div className="mt-6 grid gap-4">
        {conflicts.length > 0 ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {conflicts.length} scheduling conflict{conflicts.length === 1 ? "" : "s"} need review.
          </div>
        ) : null}
        {trip.days.map((day) => (
          <article key={day.date} className="rounded-lg border border-black/10 p-4">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays size={18} />
              <h3 className="font-semibold">{day.date} - {day.city}</h3>
              <span className="ml-auto rounded-full bg-atlas-mist px-3 py-1 text-xs">{day.energy} energy</span>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              <button className="rounded-lg border border-black/10 px-3 py-1 text-xs" onClick={() => makeDayChiller(day.date)} type="button">Make chiller</button>
              <button className="rounded-lg border border-black/10 px-3 py-1 text-xs" onClick={() => swapToIndoor(day.date)} type="button">Rain backup</button>
            </div>
            <div className="grid gap-3">
              {day.slots.map((slot) => (
                <div key={slot.name} className="grid gap-2 rounded-lg bg-atlas-mist p-3 md:grid-cols-[120px_1fr]">
                  <span className="text-sm font-semibold capitalize text-atlas-tide">{slot.name}</span>
                  <div>
                    <p className="font-medium">{slot.primary?.title ?? "Open slot"}</p>
                    <p className="text-sm text-black/60">{slot.primary?.location}</p>
                    {slot.primary?.locked ? <p className="mt-1 text-xs font-semibold text-atlas-tide">Locked booking</p> : null}
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
        <div className="rounded-lg border border-black/10 p-4">
          <h3 className="font-semibold">Activity discovery</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {trip.activities.map((activity) => (
              <article key={activity.id} className="overflow-hidden rounded-lg border border-black/10 bg-white">
                <Image className="h-32 w-full object-cover" src={activity.imageUrl} alt="" width={520} height={180} />
                <div className="space-y-2 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-atlas-tide">{activity.stream}</p>
                      <h4 className="font-semibold">{activity.name}</h4>
                    </div>
                    <span className="rounded-full bg-atlas-mist px-2 py-1 text-xs">{Math.round(activity.confidence * 100)}%</span>
                  </div>
                  <p className="text-sm text-black/70">{activity.description}</p>
                  <p className="text-sm text-black/60">{activity.whyFits}</p>
                  <div className="flex flex-wrap gap-1">
                    {activity.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-atlas-mist px-2 py-1 text-xs">{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-black/50">Sources: {activity.sourceAttribution.join(", ")}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-2 py-1 text-xs" onClick={() => tagActivity(activity.id, "pinned")} type="button"><Pin size={13} /> Pin</button>
                    <button className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-2 py-1 text-xs" onClick={() => tagActivity(activity.id, "wishlist")} type="button"><Heart size={13} /> Wishlist</button>
                    <button className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-2 py-1 text-xs" onClick={() => tagActivity(activity.id, "vetoed")} type="button"><X size={13} /> Veto</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
