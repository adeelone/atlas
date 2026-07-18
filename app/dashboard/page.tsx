import Link from "next/link";
import { demoTrip } from "@/lib/demoTrip";
import { budgetStatus, totalBudget } from "@/lib/budget/engine";

export default function DashboardPage() {
  const trips = [demoTrip];
  return (
    <main className="min-h-screen bg-atlas-paper p-6 text-atlas-ink">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-atlas-tide">Saved trips</p>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
          </div>
          <Link className="rounded-lg bg-atlas-ink px-4 py-2 text-sm font-semibold text-white" href="/">Plan a trip</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {trips.map((trip) => (
            <article key={trip.id} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
              <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${trip.heroImageUrl})` }} />
              <div className="space-y-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-atlas-tide">{trip.status}</p>
                <h2 className="text-xl font-semibold">{trip.name}</h2>
                <p className="text-sm text-black/60">{trip.cities.length} cities - {trip.days.length} days - {budgetStatus(trip.budget)} budget</p>
                <p className="text-sm font-medium">${totalBudget(trip.budget).toLocaleString()} estimated</p>
                <Link className="inline-block rounded-lg border border-black/10 px-3 py-2 text-sm" href="/">Open trip</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
