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

  it("extracts anchors from ICS text", () => {
    const anchors = parseGenericEmail("BEGIN:VEVENT\nSUMMARY:Cooking class\nDTSTART:20261104T090000Z\nDTEND:20261104T110000Z\nLOCATION:Hoi An\nEND:VEVENT");
    expect(anchors[0]).toMatchObject({ title: "Cooking class", source: "icsFile", locked: true });
  });

  it("extracts anchors from booking links", () => {
    const anchors = parseGenericEmail("https://www.airbnb.com/rooms/12345");
    expect(anchors[0]).toMatchObject({ title: "Airbnb reservation", source: "airbnb", locked: true });
  });
});
