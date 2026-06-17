"use client";

import { MailPlus } from "lucide-react";
import { useState } from "react";

export function CollaboratorsPanel() {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState<string[]>([]);

  function invite() {
    if (!email.includes("@")) return;
    setInvites((current) => Array.from(new Set([email, ...current])));
    setEmail("");
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Collaborators</h2>
      <div className="mt-4 flex gap-2">
        <input className="min-w-0 flex-1 rounded-lg border border-black/10 p-2 text-sm" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="friend@example.com" />
        <button className="inline-flex items-center gap-2 rounded-lg bg-atlas-ink px-3 py-2 text-sm font-semibold text-white" onClick={invite} type="button"><MailPlus size={16} /> Invite</button>
      </div>
      <div className="mt-3 grid gap-2">
        {invites.map((inviteEmail) => (
          <p key={inviteEmail} className="rounded-lg bg-atlas-mist p-2 text-sm">{inviteEmail} - edit access pending</p>
        ))}
      </div>
    </section>
  );
}
