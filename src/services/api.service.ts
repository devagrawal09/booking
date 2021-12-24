import type { Vehicle, BookDto, Booking } from "../dtos"
import type { AvailabilityVM, BookedVm } from "./vms"

const API_URL = process.env.API_URL

export const ApiService = {
  getVehicles: (): Promise<Vehicle[]> =>
    myFetch(`${API_URL}/vehicles`),

  getAvailability: (type: string, startDate: string, endDate: string): Promise<AvailabilityVM> =>
    myFetch(`${API_URL}/availability?type=${type}&startDate=${startDate}&endDate=${endDate}`),

  book: (booking: BookDto): Promise<BookedVm> =>
    myFetch(`${API_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    }),

  viewBookings: (username: string, password: string): Promise<Booking[]> =>
    myFetch(`${API_URL}/bookings`, {
      headers: new Headers({
        "Authorization": `Basic ${Buffer.from(`${username}:${password}`, `base64`)}`
      }),
    })
}

const myFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options)
  const data = await res.json();
  if (res.ok) {
    return data
  } else {
    throw new Error(data.message)
  }
}