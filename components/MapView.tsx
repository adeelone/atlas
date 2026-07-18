import { MapPin } from "lucide-react";
import type { Trip } from "@/types/trip";

export function MapView({ trip }: { trip: Trip }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <MapPin size={18} />
        <h2 className="text-xl font-semibold">Map</h2>
      </div>
      <div className="relative mt-4 h-64 overflow-hidden rounded-lg bg-[linear-gradient(45deg,#eff4f1_25%,transparent_25%),linear-gradient(-45deg,#eff4f1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#eff4f1_75%),linear-gradient(-45deg,transparent_75%,#eff4f1_75%)] bg-[length:28px_28px] bg-[position:0_0,0_14px,14px_-14px,-14px_0]">
        {trip.cities.map((city, idx) => (
          <div
            key={city.city}
            className="absolute rounded-full bg-atlas-clay px-3 py-2 text-xs font-semibold text-white shadow-soft"
            style={{ left: `${18 + (idx * 27) % 68}%`, top: `${24 + (idx * 19) % 45}%` }}
          >
            {idx + 1}. {city.city}
          </div>
        ))}
      </div>
    </section>
  );
}
