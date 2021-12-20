import type { Booking } from "./booking";

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  purpose: string;
  booking: Booking;
}