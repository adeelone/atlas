import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatPlanner } from "@/components/ChatPlanner";

describe("ChatPlanner", () => {
  it("shows generation stages after starting", () => {
    render(<ChatPlanner />);
    fireEvent.click(screen.getByRole("button", { name: /build my trip/i }));
    expect(screen.getAllByText("Ready").length).toBeGreaterThan(1);
  });
});
