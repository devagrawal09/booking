<script lang="ts">
  import { Row, Col, Form, Button, Alert } from 'sveltestrap'
  import BookingForm from './BookingForm.svelte'
  import KycForm from './KYCForm.svelte'
  import type { BookDto } from '../../dtos'
  import type { BookedVm } from '../../services/vms'
  import { ApiService } from '../../services/api.service'
  import Success from './Success.svelte'

  let booked: BookedVm, booking: boolean, error: string

  const onSubmit = async (e: SubmitEvent) => {
    if (booking) return
    try {
      booking = true
      error = ''
      e.preventDefault()

      const form = e.target as HTMLFormElement
      const dto: BookDto = {
        type: form.type.value,
        startDate: form.startDate.value,
        endDate: form.endDate.value,
        vehicle: parseInt(form.vehicle.value),
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
        profession: form.profession.value,
        purpose: form.purpose.value,
      }

      booked = await ApiService.book(dto)
    } catch (err) {
      error = err.message
    } finally {
      booking = false
    }
  }
</script>

{#if error}
  <Alert color="danger">
    {error}
  </Alert>
{/if}

{#if booked}
  <Success result={booked} />
{:else}
  <Form on:submit={onSubmit}>
    <Row>
      <Col md={6}>
        <BookingForm />
      </Col>
      <Col md={6}>
        <KycForm />
      </Col>
    </Row>
    <div class="text-end">
      <Button color="success" type="submit" disabled={booking}>Submit</Button>
    </div>
  </Form>
{/if}
