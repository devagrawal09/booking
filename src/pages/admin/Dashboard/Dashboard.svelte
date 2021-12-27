<script lang="ts">
  import { Table, Alert, Button } from 'sveltestrap'
  import { navigateTo } from 'svelte-router-spa'
  import { AdminService } from '../../../services'
  import CancelConfirmationModal from './CancelConfirmationModal.svelte'
  import BookingChangeForm from './BookingChangeForm.svelte'
  import type { BookingVm } from '../../../services/vms'
  import ChangeConfirmationModal from './ChangeConfirmationModal.svelte'

  let error = '',
    bookingToChange: BookingVm | undefined,
    changedBooking: BookingVm | undefined,
    bookingToCancel: BookingVm | undefined

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const adminService = AdminService(username, password)

  let bookings$ = adminService.viewBookings()

  const logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    navigateTo('login')
  }

  const toggleChangeBooking = (booking?: BookingVm) => {
    bookingToChange = booking
  }

  const toggleChangeConfirmation = (booking?: BookingVm) => {
    changedBooking = booking
  }

  const toggleCancelConfirmation = (booking?: BookingVm) => {
    bookingToCancel = booking
  }

  const changeBooking = async (booking: BookingVm) => {
    await adminService.changeBooking({
      id: booking.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      vehicle: booking.vehicle.id,
    })
    toggleChangeBooking()
    toggleChangeConfirmation()
    bookings$ = adminService.viewBookings()
  }

  const cancelBooking = async (booking: BookingVm) => {
    await adminService.cancelBooking(booking.id)
    toggleCancelConfirmation()
    bookings$ = adminService.viewBookings()
  }
</script>

<h1>Bookings</h1>

<div style="float: right;">
  <Button color="secondary" on:click={logout}>Logout</Button>
</div>

{#if error}
  <Alert color="danger">
    {error}
  </Alert>
{/if}

{#await bookings$}
  <Alert color="info">Loading bookings...</Alert>
{:then bookings}
  {#if bookings.length}
    <Table>
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Booking Reference</th>
          <th>Booking Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Customer</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each bookings as booking}
          <tr>
            <td>{booking.vehicle.name} ({booking.vehicle.plate})</td>
            <td>{booking.reference}</td>
            <td>{booking.type}</td>
            <td>{new Date(booking.startDate).toLocaleString()}</td>
            <td>{new Date(booking.endDate).toLocaleString()}</td>
            <td>{booking.customer.fullName} ({booking.customer.phone})</td>
            <td>
              <Button
                color="secondary"
                on:click={() => toggleChangeBooking(booking)}
                disabled={bookingToChange?.id === booking.id}
              >
                Change
              </Button>
              <Button
                color="danger"
                on:click={() => toggleCancelConfirmation(booking)}
              >
                Cancel
              </Button>
            </td>
          </tr>
        {/each}
      </tbody>
    </Table>
  {:else}
    <p>No bookings found</p>
  {/if}
{:catch}
  <Alert color="danger">
    {error}
  </Alert>
{/await}

{#if bookingToChange}
  <BookingChangeForm
    booking={{ ...bookingToChange }}
    cancel={() => toggleChangeBooking()}
    change={toggleChangeConfirmation}
  />
{/if}

<ChangeConfirmationModal
  isOpen={!!changedBooking}
  oldBooking={bookingToChange}
  newBooking={changedBooking}
  toggle={() => toggleChangeConfirmation()}
  confirm={changeBooking}
/>

<CancelConfirmationModal
  isOpen={!!bookingToCancel}
  booking={bookingToCancel}
  toggle={() => toggleCancelConfirmation()}
  confirm={cancelBooking}
/>
