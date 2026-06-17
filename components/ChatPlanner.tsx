"use client";

import { Send } from "lucide-react";
import { useState } from "react";

const stages = ["Intent parsed", "Cities allocated", "Activities discovered", "Schedule drafted"];

interface ChatPlannerProps {
  messages: string[];
  onPlan: (text: string) => void;
}

export function ChatPlanner({ messages, onPlan }: ChatPlannerProps) {
  const [prompt, setPrompt] = useState("12 days in Japan late October, $4k, love hiking, ramen, quiet shrines, photography, hate crowds");
  const [isPlanning, setIsPlanning] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  function runPlan() {
    setIsPlanning(true);
    stages.forEach((_, idx) => {
      window.setTimeout(() => setActiveStage(idx + 1), 180 * (idx + 1));
    });
    window.setTimeout(() => onPlan(prompt), 760);
  }

  return (
    <section aria-label="Concierge planner" className="rounded-lg border border-black/10 bg-white/82 p-4 shadow-soft backdrop-blur md:p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-atlas-tide">Concierge</p>
        <h2 className="text-2xl font-semibold">Tell Atlas the trip you have in mind.</h2>
      </div>
      <div className="space-y-3">
        <textarea
          className="min-h-36 w-full resize-none rounded-lg border border-black/10 bg-white p-4 leading-7"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          aria-label="Trip idea"
        />
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-atlas-ink px-4 py-3 text-sm font-semibold text-white"
          onClick={runPlan}
          type="button"
        >
          <Send size={16} /> Build my trip
        </button>
      </div>
      <div className="mt-5 grid gap-3">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center justify-between rounded-lg bg-atlas-mist p-3 text-sm">
            <span>{stage}</span>
            <span className={activeStage > index ? "text-atlas-moss" : "text-black/40"}>{activeStage > index ? "Done" : isPlanning ? "Working" : "Waiting"}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2 text-sm">
        {messages.map((message) => (
          <p key={message} className="rounded-lg border border-black/10 bg-white p-3">{message}</p>
        ))}
      </div>
    </section>
  );
}
