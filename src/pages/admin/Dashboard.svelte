<script lang="ts">
  import { Table, Alert } from 'sveltestrap'
  import type { Booking } from '../../dtos'
  import { ApiService } from '../../services/api.service'

  let bookings: Booking[],
    error = ''

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  ;(async function () {
    try {
      bookings = await ApiService.viewBookings(username, password)
      console.log(bookings)
    } catch (e) {
      error = e.message
    }
  })()
</script>

<h1>Bookings</h1>

{#if error}
  <Alert color="danger">
    {error}
  </Alert>
{/if}

{#if bookings}
  {#if bookings.length}
    <Table>
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Booking Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Customer</th>
        </tr>
      </thead>
      <tbody>
        {#each bookings as booking}
          <tr>
            <td>{booking.vehicle.year} {booking.vehicle.model}</td>
            <td>{booking.type}</td>
            <td>{new Date(booking.startDate).toLocaleString()}</td>
            <td>{new Date(booking.endDate).toLocaleString()}</td>
            <td>{booking.customer.fullName} ({booking.customer.phone})</td>
          </tr>
        {/each}
      </tbody>
    </Table>
  {:else}
    <p>No bookings found</p>
  {/if}
{:else}
  Loading...
{/if}
