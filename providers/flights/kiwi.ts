import type { FlightOption, FlightProvider } from "./provider";

export class KiwiFlightProvider implements FlightProvider {
  name = "kiwi";

  async search(origin: string, destination: string, date: string): Promise<FlightOption[]> {
    return [{ provider: this.name, priceUsd: 640, durationMinutes: 860, stops: 1, deepLink: `https://www.kiwi.com/search/${origin}/${destination}/${date}` }];
  }
}
