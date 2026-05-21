export interface HotelOption {
  provider: string;
  name: string;
  nightlyUsd: number;
  rating: number;
  neighborhood: string;
  refundable: boolean;
  deepLink: string;
}

export interface HotelProvider {
  name: string;
  search(city: string, checkIn: string, checkOut: string): Promise<HotelOption[]>;
}
