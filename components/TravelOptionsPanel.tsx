"use client";

import { BedDouble, Plane, Route } from "lucide-react";
import type { Trip } from "@/types/trip";

export function TravelOptionsPanel({ trip, onChange }: { trip: Trip; onChange: (trip: Trip) => void }) {
  function pinFlight(id: string) {
    onChange({ ...trip, flights: trip.flights.map((flight) => (flight.id === id ? { ...flight, pinned: !flight.pinned } : flight)) });
  }

  function pinHotel(id: string) {
    onChange({ ...trip, hotels: trip.hotels.map((hotel) => (hotel.id === id ? { ...hotel, pinned: !hotel.pinned } : hotel)) });
  }

  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">Flights, stays, and transfers</h2>
      <div className="mt-4 space-y-4">
        {trip.flights.map((flight) => (
          <div key={flight.id} className="rounded-lg bg-atlas-mist p-3 text-sm">
            <div className="flex items-center gap-2 font-semibold"><Plane size={16} /> {flight.route}</div>
            <p className="mt-1 text-black/65">${flight.priceUsd.toLocaleString()} - {Math.round(flight.durationMinutes / 60)}h - {flight.stops} stop</p>
            <div className="mt-2 flex gap-2">
              <a className="rounded-lg border border-black/10 bg-white px-3 py-1" href={flight.deepLink} target="_blank">Search</a>
              <button className="rounded-lg border border-black/10 bg-white px-3 py-1" onClick={() => pinFlight(flight.id)} type="button">{flight.pinned ? "Pinned" : "Pin"}</button>
            </div>
          </div>
        ))}
        {trip.hotels.map((hotel) => (
          <div key={hotel.id} className="rounded-lg bg-atlas-mist p-3 text-sm">
            <div className="flex items-center gap-2 font-semibold"><BedDouble size={16} /> {hotel.name}</div>
            <p className="mt-1 text-black/65">{hotel.city} - ${hotel.nightlyUsd}/night - {hotel.rating.toFixed(1)} - {hotel.neighborhood}</p>
            <div className="mt-2 flex gap-2">
              <a className="rounded-lg border border-black/10 bg-white px-3 py-1" href={hotel.deepLink} target="_blank">Search</a>
              <button className="rounded-lg border border-black/10 bg-white px-3 py-1" onClick={() => pinHotel(hotel.id)} type="button">{hotel.pinned ? "Pinned" : "Pin"}</button>
            </div>
          </div>
        ))}
        {trip.transport.map((leg) => (
          <div key={`${leg.from}-${leg.to}`} className="rounded-lg bg-atlas-mist p-3 text-sm">
            <div className="flex items-center gap-2 font-semibold"><Route size={16} /> {leg.from} to {leg.to}</div>
            <p className="mt-1 text-black/65">{leg.mode} - {leg.durationHours.toFixed(1)}h - ${leg.costUsd} - {leg.tradeoff}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
