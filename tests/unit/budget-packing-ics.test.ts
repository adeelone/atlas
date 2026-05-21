import { describe, expect, it } from "vitest";
import { budgetStatus, suggestBudgetTrims, totalBudget } from "@/lib/budget/engine";
import { generateIcs } from "@/lib/calendar/ics";
import { buildPackingList } from "@/lib/packing/rules";
import { demoTrip } from "@/lib/demoTrip";

describe("budget, packing, and ICS", () => {
  it("computes budget totals and status", () => {
    expect(totalBudget(demoTrip.budget)).toBe(4510);
    expect(budgetStatus(demoTrip.budget)).toBe("over");
    expect(budgetStatus({ capUsd: 1000, categories: { lodging: 920 } })).toBe("near");
    expect(budgetStatus({ capUsd: 1000, categories: { lodging: 500 } })).toBe("under");
    expect(suggestBudgetTrims({ capUsd: 1000, categories: { lodging: 500 } })).toEqual([]);
  });

  it("builds packing rules from intent", () => {
    expect(buildPackingList(demoTrip.intent)).toContain("Temple-ready shoulder cover");
    expect(buildPackingList({ ...demoTrip.intent, dateWindow: "May", interests: ["hiking"], destinations: ["Peru"] })).toContain("Trail shoes");
  });

  it("generates an ICS calendar", () => {
    expect(generateIcs(demoTrip)).toContain("BEGIN:VCALENDAR");
    expect(generateIcs(demoTrip)).toContain("Wat Pha Lat");
  });
});
