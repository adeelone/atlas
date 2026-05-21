import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BudgetPanel } from "@/components/BudgetPanel";
import { demoTrip } from "@/lib/demoTrip";

describe("BudgetPanel", () => {
  it("renders trim suggestions when over budget", () => {
    render(<BudgetPanel budget={demoTrip.budget} />);
    expect(screen.getByText("$4,510")).toBeInTheDocument();
    expect(screen.getByText(/self-guided neighborhood walk/i)).toBeInTheDocument();
  });
});
