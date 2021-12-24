import type { Booking, Vehicle } from "../dtos";

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

export interface BookedVm {
  booking: Booking;
  price: number;
  period: string;
}
