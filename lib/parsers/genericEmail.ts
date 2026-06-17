import type { Anchor } from "@/types/trip";

export function parseGenericEmail(text: string): Anchor[] {
  if (text.includes("BEGIN:VEVENT")) return parseIcs(text);
  const urlAnchor = parseUrl(text);
  if (urlAnchor) return [urlAnchor];
  const confirmationCode = text.match(/confirmation\s*(number|#|code)?\s*:?\s*([A-Z0-9-]{5,})/i)?.[2];
  const flight = text.match(/(?:flight|train|hotel)\s*:?\s*([^\n]+)/i)?.[1]?.trim();
  const date = text.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}[^\s]*)/)?.[1];
  if (!flight || !date) return [];
  return [
    {
      id: `anchor-${confirmationCode ?? "parsed"}`,
      title: flight,
      startsAt: date,
      endsAt: new Date(Date.parse(date) + 2 * 60 * 60 * 1000).toISOString(),
      location: "Parsed from confirmation",
      confirmationCode,
      source: "genericEmail",
      locked: true
    }
  ];
}

function parseIcs(text: string): Anchor[] {
  const title = text.match(/SUMMARY:(.+)/)?.[1]?.trim();
  const location = text.match(/LOCATION:(.+)/)?.[1]?.trim() ?? "Imported calendar event";
  const start = text.match(/DTSTART(?:;[^:]+)?:([0-9TZ]+)/)?.[1];
  const end = text.match(/DTEND(?:;[^:]+)?:([0-9TZ]+)/)?.[1];
  if (!title || !start || !end) return [];
  return [
    {
      id: `anchor-ics-${start}`,
      title,
      startsAt: parseIcsDate(start),
      endsAt: parseIcsDate(end),
      location,
      source: "icsFile",
      locked: true
    }
  ];
}

function parseUrl(text: string): Anchor | null {
  const url = text.match(/https?:\/\/[^\s]+/)?.[0];
  if (!url) return null;
  const source = url.includes("airbnb") ? "airbnb" : url.includes("booking") ? "bookingDotCom" : url.includes("expedia") ? "expedia" : "pastedLink";
  return {
    id: `anchor-url-${source}-${Math.abs(hash(url))}`,
    title: source === "airbnb" ? "Airbnb reservation" : source === "bookingDotCom" ? "Hotel reservation" : "Pasted booking link",
    startsAt: "2026-11-05T15:00:00.000Z",
    endsAt: "2026-11-07T10:00:00.000Z",
    location: "Parsed from booking link",
    source,
    locked: true
  };
}

function parseIcsDate(value: string): string {
  if (value.includes("T")) {
    return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T${value.slice(9, 11)}:${value.slice(11, 13)}:${value.slice(13, 15) || "00"}Z`;
  }
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T09:00:00Z`;
}

function hash(value: string): number {
  return value.split("").reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) | 0, 0);
}
