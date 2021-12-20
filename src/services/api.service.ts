import type { Vehicle, BookingDto, BookDto, Booking } from "../dtos"

const API_URL = 'https://vns-on-wheels.herokuapp.com/api'

export const ApiService = {
  getVehicles: (): Promise<Vehicle[]> =>
    fetch(`${API_URL}/vehicles`)
      .then((res) => res.json()),

  getAvailability: (type: string, startDate: string, endDate: string): Promise<BookingDto> =>
    fetch(`${API_URL}/availability?type=${type}&startDate=${startDate}&endDate=${endDate}`)
      .then((res) => res.json()),

  book: (booking: BookDto): Promise<Booking> =>
    fetch(`${API_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(booking)
    }).then((res) => res.json())
}
