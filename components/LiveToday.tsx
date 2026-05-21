import { Clock, Languages, Umbrella } from "lucide-react";
import type { TripDay } from "@/types/trip";

export function LiveToday({ day }: { day?: TripDay }) {
  const next = day?.slots.find((slot) => slot.primary)?.primary;
  return (
    <section className="rounded-lg border border-black/10 bg-atlas-ink p-5 text-white shadow-sm">
      <h2 className="text-xl font-semibold">Today</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <p className="flex items-center gap-2"><Clock size={16} /> Next: {next?.title ?? "No events scheduled"}</p>
        <p className="flex items-center gap-2"><Umbrella size={16} /> Rain backup ready for afternoon plans.</p>
        <p className="flex items-center gap-2"><Languages size={16} /> Key phrase: thank you · khop khun</p>
      </div>
    </section>
  );
}
