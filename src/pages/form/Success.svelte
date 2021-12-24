<script lang="ts">
  import type { BookedVm } from '../../services/vms'

  export let result: BookedVm
</script>

<h1>Success</h1>
<p>
  You have booked a {result.booking.vehicle.name} for {result.period} starting from
  {new Date(result.booking.startDate).toLocaleString()}
  to
  {new Date(result.booking.endDate).toLocaleString()}.
</p>
