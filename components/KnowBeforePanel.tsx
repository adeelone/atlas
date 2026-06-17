import type { KnowBeforeYouGo } from "@/types/trip";

export function KnowBeforePanel({ notes }: { notes: KnowBeforeYouGo[] }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Know before you go</h2>
      <div className="mt-4 grid gap-3">
        {notes.map((note) => (
          <article key={note.country} className="rounded-lg bg-atlas-mist p-3 text-sm leading-6">
            <h3 className="font-semibold">{note.country}</h3>
            <p><strong>Visa:</strong> {note.visa}</p>
            <p><strong>Health:</strong> {note.health}</p>
            <p><strong>Money:</strong> {note.currency}</p>
            <p><strong>Plug:</strong> {note.plug}</p>
            <p><strong>Tipping:</strong> {note.tipping}</p>
            <p><strong>Watch for:</strong> {note.scams}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
