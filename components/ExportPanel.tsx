"use client";

import { CalendarPlus, Download, FileText, Share2 } from "lucide-react";
import { generateIcs } from "@/lib/calendar/ics";
import type { Trip } from "@/types/trip";

export function ExportPanel({ trip }: { trip: Trip }) {
  const downloadIcs = () => {
    const blob = new Blob([generateIcs(trip)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${trip.name}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const copyShareLink = async () => {
    const url = `${window.location.origin}/share/${trip.shareSlug}`;
    await navigator.clipboard?.writeText(url);
  };

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Export</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-atlas-ink px-3 py-2 text-sm text-white" type="button" title="Requires Google OAuth setup"><CalendarPlus size={16} /> Google</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm" onClick={downloadIcs} type="button"><Download size={16} /> ICS</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm" onClick={() => window.print()} type="button"><FileText size={16} /> PDF</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-sm" onClick={copyShareLink} type="button"><Share2 size={16} /> Share</button>
      </div>
    </section>
  );
}
