"use client";

import { Lock, Upload } from "lucide-react";
import { parseGenericEmail } from "@/lib/parsers/genericEmail";
import { useMemo, useState } from "react";

export function AnchorPaster() {
  const [text, setText] = useState("Flight: Return flight from Bangkok\nConfirmation: ATLAS6\n2026-11-14T21:10:00+07:00");
  const anchors = useMemo(() => parseGenericEmail(text), [text]);
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-atlas-tide">Anchor</p>
      <h2 className="text-2xl font-semibold">Paste what is already booked.</h2>
      <textarea className="mt-5 min-h-40 w-full resize-none rounded-lg border border-black/10 p-4" value={text} onChange={(event) => setText(event.target.value)} aria-label="Booked trip details" />
      <div className="mt-4 grid gap-2">
        {anchors.map((anchor) => (
          <div key={anchor.id} className="flex items-center gap-3 rounded-lg bg-atlas-mist p-3 text-sm">
            <Lock size={16} />
            <span>{anchor.title}</span>
            <span className="ml-auto text-black/55">{anchor.confirmationCode}</span>
          </div>
        ))}
        <button className="inline-flex w-fit items-center gap-2 rounded-lg border border-black/10 px-4 py-2 text-sm" type="button">
          <Upload size={16} /> Upload ICS or screenshot
        </button>
      </div>
    </section>
  );
}
