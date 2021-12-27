<script lang="ts">
  import { FormGroup, Input, Label, Row, Col, Alert } from 'sveltestrap'
  import { PublicService } from '../../services'
  import VehicleCard from './VehicleCard.svelte'
  import type { VehicleAvailability } from '../../services/vms'

  let bookingType: string,
    startDate: string,
    endDate: string,
    loading = false,
    period,
    price,
    availability: VehicleAvailability[],
    error: string

  const getAvailability = async ({
    type = bookingType,
    start = startDate,
    end = endDate,
  }) => {
    try {
      error = ''
      if (!type || !start || !end) return null

      loading = true
      const dto = await PublicService.getAvailability(type, start, end)
      availability = dto.availability
      price = dto.price
      period = dto.period
    } catch (err) {
      error = err.message
    } finally {
      loading = false
    }
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

{#if error}
  <Alert color="danger">
    {error}
  </Alert>
{/if}

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
      {#if availability}
        {#each availability as vehicleAvailability}
          <VehicleCard {vehicleAvailability} />
        {/each}
      {:else}
        <p>Input booking time to see available vehicles</p>
      {/if}
    </Col>
  </Row>
{/if}
