import type { HotelOption, HotelProvider } from "./provider";

export class BookingHotelProvider implements HotelProvider {
  name = "booking";

  async search(city: string): Promise<HotelOption[]> {
    return [{ provider: this.name, name: `${city} Garden House`, nightlyUsd: 118, rating: 4.6, neighborhood: "walkable central edge", refundable: true, deepLink: "https://www.booking.com" }];
  }
}
