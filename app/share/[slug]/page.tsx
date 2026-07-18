import { notFound } from "next/navigation";
import { demoTrip } from "@/lib/demoTrip";

export default function SharePage({ params }: { params: { slug: string } }) {
  if (params.slug !== demoTrip.shareSlug) notFound();
  return (
    <main className="min-h-screen bg-atlas-paper p-6 text-atlas-ink">
      <article className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-atlas-tide">Read-only trip</p>
        <h1 className="mt-2 text-3xl font-semibold">{demoTrip.name}</h1>
        <p className="mt-2 text-black/65">{demoTrip.cities.map((city) => city.city).join(" - ")}</p>
        <div className="mt-6 grid gap-4">
          {demoTrip.days.map((day) => (
            <section key={day.date} className="rounded-lg bg-atlas-mist p-4">
              <h2 className="font-semibold">{day.date} - {day.city}</h2>
              <ul className="mt-2 list-inside list-disc text-sm leading-6">
                {day.slots.map((slot) => (
                  <li key={slot.name}>{slot.name}: {slot.primary?.title ?? "Open"}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
