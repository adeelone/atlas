import type { Trip } from "@/types/trip";
import { totalBudget, budgetStatus } from "@/lib/budget/engine";

export function TripDashboard({ trip }: { trip: Trip }) {
  const total = totalBudget(trip.budget);
  return (
    <div className="grid gap-3 text-sm md:grid-cols-4">
      <div className="rounded-lg border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur">
        <p className="text-black/55">Cities</p>
        <p className="text-xl font-semibold">{trip.cities.length}</p>
      </div>
      <div className="rounded-lg border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur">
        <p className="text-black/55">Days</p>
        <p className="text-xl font-semibold">{trip.days.length}</p>
      </div>
      <div className="rounded-lg border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur">
        <p className="text-black/55">Estimate</p>
        <p className="text-xl font-semibold">${total.toLocaleString()}</p>
      </div>
      <div className="rounded-lg border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur">
        <p className="text-black/55">Budget</p>
        <p className="text-xl font-semibold capitalize">{budgetStatus(trip.budget)}</p>
      </div>
    </div>
  );
}
