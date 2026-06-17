"use client";

import { useState } from "react";
import type { Trip } from "@/types/trip";

export function MemoriesPanel({ trip }: { trip: Trip }) {
  const [notes, setNotes] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  function addNote() {
    if (!draft.trim()) return;
    setNotes((current) => [draft.trim(), ...current]);
    setDraft("");
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Memories</h2>
      <p className="mt-1 text-sm text-black/60">A simple post-trip journal tied to the itinerary.</p>
      <div className="mt-4 flex gap-2">
        <input className="min-w-0 flex-1 rounded-lg border border-black/10 p-2 text-sm" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={`Favorite moment from ${trip.cities[0]?.city ?? "the trip"}`} />
        <button className="rounded-lg bg-atlas-ink px-3 py-2 text-sm font-semibold text-white" onClick={addNote} type="button">Add</button>
      </div>
      <div className="mt-3 grid gap-2">
        {notes.map((note, idx) => (
          <p key={`${note}-${idx}`} className="rounded-lg bg-atlas-mist p-2 text-sm">{note}</p>
        ))}
      </div>
    </section>
  );
}
