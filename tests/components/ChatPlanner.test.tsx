import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatPlanner } from "@/components/ChatPlanner";

describe("ChatPlanner", () => {
  it("shows generation stages after starting", () => {
    render(<ChatPlanner messages={["Ready"]} onPlan={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /build my trip/i }));
    expect(screen.getAllByText("Working").length).toBeGreaterThan(1);
  });
});
