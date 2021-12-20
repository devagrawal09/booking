<script lang="ts">
  import {
    FormGroup,
    Input,
    Label,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Image,
    Row,
    Col,
  } from 'sveltestrap'
  import type { Vehicle, Booking } from '../dtos'
  import { ApiService } from '../services/api.service'
  import VehicleCard from './VehicleCard.svelte'

  let bookingType,
    startDate,
    endDate,
    vehicles: Vehicle[] = [],
    conflicts: Booking[] = null,
    loading = false,
    period,
    price
  ;(async function () {
    vehicles = await ApiService.getVehicles()
  })()

  const getAvailability = async ({
    type = bookingType,
    start = startDate,
    end = endDate,
  }) => {
    if (!type || !start || !end) return null

    loading = true
    const dto = await ApiService.getAvailability(type, start, end)
    conflicts = dto.conflicts
    price = dto.price
    period = dto.period
    loading = false
    console.log({ conflicts })
  }

  const isVehicleAvailable = (vehicle: Vehicle) => {
    if (!conflicts?.length) return true
    return !conflicts.find((booking) => booking.vehicle.id === vehicle.id)
  }

  const vehicleConflict = (vehicle: Vehicle) => {
    const c = conflicts.find((booking) => booking.vehicle.id === vehicle.id)
    console.log({ c })
    return c
  }

  const onChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement
    if (name === 'type') {
      bookingType = value
    } else if (name === 'startDate') {
      startDate = value
    } else if (name === 'endDate') {
      endDate = value
    }
    getAvailability({ type: bookingType, start: startDate, end: endDate })
  }
</script>

<h2>Booking Information</h2>
<FormGroup>
  <Label for="type">Booking Type</Label>
  <Input type="select" name="type" id="type" on:change={onChange} required>
    <option>HOURLY</option>
    <option>DAILY</option>
  </Input>
</FormGroup>

<FormGroup>
  <Label for="date">Booking start time</Label>
  <Input
    type="datetime-local"
    name="startDate"
    id="startDate"
    placeholder="Booking start time"
    on:change={onChange}
    required
  />
</FormGroup>

<FormGroup>
  <Label for="date">Booking end time</Label>
  <Input
    type="datetime-local"
    name="endDate"
    id="endDate"
    placeholder="Booking end time"
    on:change={onChange}
    required
  />
</FormGroup>

{#if loading}
  Loading price and vehicles...
{:else if price}
  Cost: <strong>Rs. {price}</strong> <br />
  Period: <strong>{period}</strong> <br />
  <Row>
    <Col>
      {#if conflicts}
        {#each vehicles as vehicle}
          <VehicleCard {vehicle} {conflicts} />
        {/each}
      {:else}
        <p>Input booking time to see available vehicles</p>
      {/if}
    </Col>
  </Row>
{:else}
  Input booking type and times to see price and available vehicles
{/if}
