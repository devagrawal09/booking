import type { Booking } from "./booking";

export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  image: string;
  description: string;
  bookings: Booking[];
}
