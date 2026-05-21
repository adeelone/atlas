import { budgetStatus, suggestBudgetTrims, totalBudget } from "@/lib/budget/engine";
import type { BudgetSummary } from "@/types/trip";

export function BudgetPanel({ budget }: { budget: BudgetSummary }) {
  const total = totalBudget(budget);
  const status = budgetStatus(budget);
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Budget</h2>
      <p className="mt-2 text-3xl font-semibold">${total.toLocaleString()}</p>
      <p className="text-sm text-black/60">Cap ${budget.capUsd.toLocaleString()} · {status}</p>
      <div className="mt-4 grid gap-2">
        {Object.entries(budget.categories).map(([name, value]) => (
          <div key={name} className="flex justify-between rounded-lg bg-atlas-mist p-2 text-sm capitalize">
            <span>{name}</span>
            <span>${value.toLocaleString()}</span>
          </div>
        ))}
      </div>
      {suggestBudgetTrims(budget).map((trim) => (
        <p key={trim} className="mt-3 rounded-lg bg-atlas-clay/10 p-3 text-sm text-atlas-clay">{trim}</p>
      ))}
    </section>
  );
}
