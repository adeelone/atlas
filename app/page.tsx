import { AnchorPaster } from "@/components/AnchorPaster";
import { BudgetPanel } from "@/components/BudgetPanel";
import { ChatPlanner } from "@/components/ChatPlanner";
import { ExportPanel } from "@/components/ExportPanel";
import { ItineraryEditor } from "@/components/ItineraryEditor";
import { LiveToday } from "@/components/LiveToday";
import { MapView } from "@/components/MapView";
import { PackingList } from "@/components/PackingList";
import { Wizard } from "@/components/Wizard";
import { demoTrip } from "@/lib/demoTrip";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-atlas-paper text-atlas-ink">
      <section className="relative overflow-hidden border-b border-black/10 bg-[linear-gradient(120deg,rgba(239,244,241,.94),rgba(251,250,246,.88)),url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[1.08fr_.92fr] md:px-8 md:py-12">
          <div className="flex min-h-[560px] flex-col justify-between">
            <nav className="flex items-center justify-between">
              <span className="text-xl font-semibold tracking-wide">Atlas</span>
              <div className="flex gap-2 text-sm">
                <a className="rounded-full bg-white/70 px-4 py-2 shadow-sm" href="#builder">Builder</a>
                <a className="rounded-full bg-white/70 px-4 py-2 shadow-sm" href="#trip">Trip</a>
              </div>
            </nav>
            <div className="max-w-3xl py-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-atlas-tide">All-in-one AI travel planner</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight md:text-7xl">Atlas</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-black/70">
                Go from a vague idea to a complete, editable trip with flights, stays, transfers, daily plans, hidden finds, budgets, packing, exports, and live in-trip support.
              </p>
            </div>
            <div className="grid gap-3 text-sm md:grid-cols-3">
              {["Concierge chat", "Builder wizard", "Paste booked anchors"].map((item) => (
                <div key={item} className="rounded-lg border border-black/10 bg-white/65 p-4 shadow-sm backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <ChatPlanner />
        </div>
      </section>
      <section id="builder" className="mx-auto grid max-w-7xl gap-6 px-5 py-8 md:grid-cols-[1fr_.9fr] md:px-8">
        <Wizard />
        <AnchorPaster />
      </section>
      <section id="trip" className="mx-auto grid max-w-7xl gap-6 px-5 pb-12 md:grid-cols-[1.15fr_.85fr] md:px-8">
        <ItineraryEditor trip={demoTrip} />
        <div className="grid gap-6">
          <MapView trip={demoTrip} />
          <BudgetPanel budget={demoTrip.budget} />
          <ExportPanel trip={demoTrip} />
          <PackingList items={demoTrip.packing} />
          <LiveToday day={demoTrip.days[0]} />
        </div>
      </section>
    </main>
  );
}
