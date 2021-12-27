import type { ChangeBookingDto } from "./dtos"
import { myFetch } from "./util"
import type { BookingVm } from "./vms"

const API_URL = process.env.API_URL

export const AdminService = (username: string, password: string) => ({
  viewBookings: (): Promise<BookingVm[]> =>
    myFetch(`${API_URL}/bookings`, {
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
      },
    }),

  changeBooking: (data: ChangeBookingDto): Promise<BookingVm> =>
    myFetch(`${API_URL}/bookings/${data.id}`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }),

  cancelBooking: (id: number,): Promise<BookingVm> =>
    myFetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
      },
    })
})