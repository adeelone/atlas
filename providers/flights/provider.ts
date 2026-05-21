export interface FlightOption {
  provider: string;
  priceUsd: number;
  durationMinutes: number;
  stops: number;
  deepLink: string;
}

export interface FlightProvider {
  name: string;
  search(origin: string, destination: string, date: string): Promise<FlightOption[]>;
}
