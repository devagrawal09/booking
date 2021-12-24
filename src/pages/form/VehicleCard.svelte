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
  import type { VehicleAvailability } from '../../services/vms'

  export let vehicleAvailability: VehicleAvailability

  $: vehicle = vehicleAvailability.vehicle
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
          disabled={!vehicleAvailability.available}
        />
      </CardTitle>
    </CardHeader>
  </Label>
  <CardBody>
    {#if !vehicleAvailability.available}
      <p class="text-danger">
        Available before
        {new Date(vehicleAvailability['availableBefore']).toLocaleString()}
        or after
        {new Date(vehicleAvailability['availableAfter']).toLocaleString()}
      </p>
    {:else}
      <p class="text-success">Available</p>
    {/if}
    <Image src={vehicle.image} fluid alt={vehicle.name} />
  </CardBody>
</Card>
