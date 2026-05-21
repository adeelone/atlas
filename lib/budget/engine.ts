import type { BudgetSummary } from "@/types/trip";

export function totalBudget(summary: BudgetSummary): number {
  return Object.values(summary.categories).reduce((sum, value) => sum + value, 0);
}

export function budgetStatus(summary: BudgetSummary): "under" | "near" | "over" {
  const total = totalBudget(summary);
  if (total > summary.capUsd) return "over";
  if (total > summary.capUsd * 0.9) return "near";
  return "under";
}

export function suggestBudgetTrims(summary: BudgetSummary): string[] {
  if (budgetStatus(summary) !== "over") return [];
  return [
    "Swap one paid tour for a self-guided neighborhood walk.",
    "Move one hotel stay to a nearby transit-connected neighborhood.",
    "Use rail or coach on the shortest intercity leg when time allows."
  ];
}
