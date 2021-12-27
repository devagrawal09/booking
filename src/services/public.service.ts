import type { Vehicle, BookDto } from "../dtos"
import { myFetch } from "./util"
import type { AvailabilityVM, BookingVm } from "./vms"

const API_URL = process.env.API_URL

export const PublicService = {
  getVehicles: (): Promise<Vehicle[]> =>
    myFetch(`${API_URL}/vehicles`),

  getAvailability: (
    type: string,
    startDate: string,
    endDate: string,
    excludeBooking?: number
  ): Promise<AvailabilityVM> => {
    let url = `${API_URL}/availability?type=${type}&startDate=${startDate}&endDate=${endDate}`;
    if (excludeBooking) {
      url += `&excludeBooking=${excludeBooking}`;
    }
    return myFetch(url)
  },

  book: (booking: BookDto): Promise<BookingVm> =>
    myFetch(`${API_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    }),

}
