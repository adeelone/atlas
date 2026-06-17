"use client";

import { FileUp } from "lucide-react";
import type { UploadedDocument } from "@/types/trip";

export function DocumentsPanel({ documents, onAdd }: { documents: UploadedDocument[]; onAdd: (doc: UploadedDocument) => void }) {
  function addFromFile(file: File) {
    onAdd({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      kind: file.name.toLowerCase().includes("passport") ? "passport" : file.name.toLowerCase().includes("visa") ? "visa" : "other",
      addedAt: new Date().toISOString()
    });
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Documents</h2>
      <label className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-black/20 p-4 text-sm">
        <FileUp size={18} />
        Add passport, visa, insurance, or confirmation PDF
        <input className="sr-only" type="file" onChange={(event) => event.target.files?.[0] && addFromFile(event.target.files[0])} />
      </label>
      <div className="mt-3 grid gap-2">
        {documents.length === 0 ? <p className="text-sm text-black/55">No documents added yet. Files are only listed locally in this demo.</p> : null}
        {documents.map((doc) => (
          <div key={doc.id} className="rounded-lg bg-atlas-mist p-3 text-sm">
            <p className="font-medium">{doc.name}</p>
            <p className="text-black/55">{doc.kind} - {new Date(doc.addedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
