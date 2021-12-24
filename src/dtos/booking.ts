import type { Customer } from "./customer";
import type { Vehicle } from "./vehicle";

export interface Booking {
  id: number;
  startDate: Date;
  endDate: Date;
  vehicle: Vehicle;
  customer: Customer;
}

export interface BookDto {
  type: string;
  startDate: string;
  endDate: string;
  vehicle: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profession: string;
  purpose: string;
}
