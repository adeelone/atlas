import { describe, expect, it } from "vitest";
import { parseGenericEmail } from "@/lib/parsers/genericEmail";

describe("paste-in parsers", () => {
  it("extracts a locked anchor from confirmation text", () => {
    const anchors = parseGenericEmail("Flight: Bangkok return\nConfirmation: ABC123\n2026-11-14T21:10:00+07:00");
    expect(anchors[0]?.locked).toBe(true);
    expect(anchors[0]?.confirmationCode).toBe("ABC123");
  });

  it("returns no anchors when critical fields are missing", () => {
    expect(parseGenericEmail("Confirmation: ABC123")).toEqual([]);
  });
});
