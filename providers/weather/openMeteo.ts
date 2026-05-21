export interface WeatherForecast {
  city: string;
  summary: string;
  precipitationChance: number;
}

export async function getOpenMeteoForecast(city: string): Promise<WeatherForecast> {
  return { city, summary: "Warm with a chance of afternoon showers", precipitationChance: 38 };
}
