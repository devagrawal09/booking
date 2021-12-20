<script lang="ts">
  import { Container, Row, Col, Form, Button } from 'sveltestrap'
  import BookingForm from './components/BookingForm.svelte'
  import KycForm from './components/KYCForm.svelte'
  import type { BookDto } from './dtos'
  import { ApiService } from './services/api.service'

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault()
    console.log('submit')
    const form = e.target as HTMLFormElement
    const dto: BookDto = {
      type: form.type.value,
      startDate: new Date(form.startDate.value),
      endDate: new Date(form.endDate.value),
      vehicle: parseInt(form.vehicle.value),
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      profession: form.profession.value,
      purpose: form.purpose.value,
    }
    console.log({ dto })

    const res = await ApiService.book(dto)
    console.log({ res })
  }
</script>

<main>
  <Container>
    <Form on:submit={onSubmit}>
      <Row>
        <Col xs={6}>
          <BookingForm />
        </Col>
        <Col xs={6}>
          <KycForm />
        </Col>
      </Row>
      <div class="text-end">
        <Button color="success" type="submit">Submit</Button>
      </div>
    </Form>
  </Container>
</main>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
