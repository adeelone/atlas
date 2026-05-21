"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export function PackingList({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Packing</h2>
      <div className="mt-4 grid gap-2">
        {items.map((item) => (
          <button key={item} className="flex items-center gap-2 rounded-lg bg-atlas-mist p-2 text-left text-sm" onClick={() => setChecked((current) => (current.includes(item) ? current.filter((value) => value !== item) : [...current, item]))} type="button">
            <span className="grid size-5 place-items-center rounded border border-black/20 bg-white">{checked.includes(item) ? <Check size={14} /> : null}</span>
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
