import { Clock, Languages, Umbrella } from "lucide-react";
import type { Trip, TripDay } from "@/types/trip";

export function LiveToday({ day, trip, onChange }: { day?: TripDay; trip: Trip; onChange: (trip: Trip) => void }) {
  const next = day?.slots.find((slot) => slot.primary)?.primary;
  function replanRestOfDay() {
    if (!day) return;
    onChange({
      ...trip,
      days: trip.days.map((item) =>
        item.date === day.date
          ? {
              ...item,
              slots: item.slots.map((slot) =>
                slot.name === "afternoon" || slot.name === "evening"
                  ? { ...slot, primary: slot.primary ? { ...slot.primary, title: "Flexible indoor backup near the hotel", fallback: "Original plan kept as an option." } : slot.primary }
                  : slot
              )
            }
          : item
      )
    });
  }
  function enableReminder() {
    if (!("Notification" in window)) return;
    void Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        window.setTimeout(() => new Notification("Atlas reminder", { body: next ? `Upcoming: ${next.title}` : "Check your trip plan." }), 1000);
      }
    });
  }
  return (
    <section className="rounded-lg border border-black/10 bg-atlas-ink p-5 text-white shadow-sm">
      <h2 className="text-xl font-semibold">Today</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <p className="flex items-center gap-2"><Clock size={16} /> Next: {next?.title ?? "No events scheduled"}</p>
        <p className="flex items-center gap-2"><Umbrella size={16} /> Rain backup ready for afternoon plans.</p>
        <p className="flex items-center gap-2"><Languages size={16} /> Key phrase: thank you · khop khun</p>
        <button className="rounded-lg bg-white px-3 py-2 text-left text-sm font-semibold text-atlas-ink" onClick={replanRestOfDay} type="button">
          Something changed - replan today
        </button>
        <button className="rounded-lg border border-white/30 px-3 py-2 text-left text-sm font-semibold text-white" onClick={enableReminder} type="button">
          Enable test reminder
        </button>
      </div>
    </section>
  );
}
