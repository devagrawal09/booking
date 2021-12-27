<script lang="ts">
  import { Form, FormGroup, Input, Alert, Row, Col, Button } from 'sveltestrap'
  import { PublicService } from '../../../services'
  import type { BookingVm } from '../../../services/vms'
  import VehicleCard from '../../form/VehicleCard.svelte'

  export let booking: BookingVm,
    cancel: () => void,
    change: (changedBooking: BookingVm) => void

  const getAvailability = async ({ type, startDate, endDate }) => {
    if (!type || !startDate || !endDate) return null

    return PublicService.getAvailability(type, startDate, endDate, booking.id)
  }

  $: availability$ = getAvailability(booking)

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    change(booking)
  }
</script>

<Form on:submit={onSubmit}>
  <Row>
    <Col md={4}>
      <p>Changing booking <strong>{booking.reference}</strong></p>
      <Row>
        <Col sm={3}>Start Date</Col>
        <Col sm={9}>
          <FormGroup>
            <Input
              type="datetime-local"
              name="startDate"
              id="startDate"
              placeholder="Booking start time"
              bind:value={booking.startDate}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>End Date</Col>
        <Col sm={9}>
          <FormGroup>
            <Input
              type="datetime-local"
              name="endDate"
              id="endDate"
              placeholder="Booking end time"
              bind:value={booking.endDate}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          {#await availability$}
            Loading price and vehicles...
          {:then availability}
            Cost: <strong>Rs. {availability.price}</strong> <br />
            Period: <strong>{availability.period}</strong> <br />
          {/await}
        </Col>
        <Col md={6} class="text-end">
          <Button type="button" color="dark" on:click={cancel}>Cancel</Button>
          <Button type="submit" color="success">Save</Button>
        </Col>
      </Row>
    </Col>
    <Col md={8}>
      {#await availability$}
        Loading price and vehicles...
      {:then availability}
        <Row>
          <Col md={4}>
            {#if availability.availability}
              {#each availability.availability as vehicleAvailability}
                <VehicleCard {vehicleAvailability} />
              {/each}
            {:else}
              <p>Input booking time to see available vehicles</p>
            {/if}
          </Col>
        </Row>
      {:catch err}
        <Alert color="danger">
          {err.message}
        </Alert>
      {/await}
    </Col>
  </Row>
</Form>
