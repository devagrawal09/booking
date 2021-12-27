<script lang="ts">
  import type { BookingVm } from '../../services/vms'

  export let booking: BookingVm
</script>

<h1>Success</h1>
<p>
  You have booked a {booking.vehicle.name} for {booking.period} starting from
  {new Date(booking.startDate).toLocaleString()}
  to
  {new Date(booking.endDate).toLocaleString()}.
</p>

<h3>Booking Reference number: {booking.reference}</h3>
<p>Make note of this reference number. You can screenshot this page</p>
