<script lang="ts">
  import {
    Input,
    Label,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Image,
  } from 'sveltestrap'
  import type { Vehicle, Booking } from '../dtos'

  export let vehicle: Vehicle, conflicts: Booking[]
  console.log({ vehicle, conflicts })
  const vehicleConflict = conflicts.find(
    (booking) => booking.vehicle.id === vehicle.id,
  )
</script>

<Card>
  <Label for={vehicle.id.toString()}>
    <CardHeader>
      <CardTitle>
        <Input
          type="radio"
          name="vehicle"
          value={vehicle.id.toString()}
          id={vehicle.id.toString()}
          label={vehicle.name}
          disabled={!!vehicleConflict}
        />
      </CardTitle>
    </CardHeader>
  </Label>
  <CardBody>
    {#if vehicleConflict}
      <p class="text-danger">
        Available before
        {new Date(vehicleConflict.startDate).toLocaleString()}
        or after
        {new Date(vehicleConflict.endDate).toLocaleString()}
      </p>
    {:else}
      <p class="text-success">Available</p>
    {/if}
    <Image src={vehicle.image} fluid alt={vehicle.name} />
  </CardBody>
</Card>
