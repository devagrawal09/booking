import type { Customer, Vehicle } from "../dtos";

export type VehicleAvailability =
  | {
    vehicle: Vehicle;
    available: true;
  }
  | {
    vehicle: Vehicle;
    available: false;
    availableBefore: Date;
    availableAfter: Date;
  };

export interface AvailabilityVM {
  availability: VehicleAvailability[];
  period: string;
  price: number;
}

export interface BookingVm {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  vehicle: Vehicle;
  customer: Customer;
  reference: string;

  period: string;
  price: number;
}
