import type { Anchor } from "@/types/trip";

export function parseGenericEmail(text: string): Anchor[] {
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
