import { MapPin } from "lucide-react";
import type { Trip } from "@/types/trip";

export function MapView({ trip }: { trip: Trip }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin size={18} />
        <h2 className="text-xl font-semibold">Map</h2>
      </div>
      <div className="mt-4 grid h-64 place-items-center rounded-lg bg-[linear-gradient(45deg,#eff4f1_25%,transparent_25%),linear-gradient(-45deg,#eff4f1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eff4f1_75%),linear-gradient(-45deg,transparent_75%,#eff4f1_75%)] bg-[length:28px_28px] bg-[position:0_0,0_14px,14px_-14px,-14px_0]">
        <div className="rounded-full bg-atlas-clay px-4 py-2 text-sm font-semibold text-white">{trip.days[0]?.city}</div>
      </div>
    </section>
  );
}
