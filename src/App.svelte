<script lang="ts">
  import { Container, Row, Col, Form } from 'sveltestrap'
  import BookingForm from './components/BookingForm.svelte'
  import KycForm from './components/KYCForm.svelte'
</script>

<main>
  <Container>
    <Form>
      <Row>
        <Col xs={6}>
          <BookingForm />
        </Col>
        <Col xs={6}>
          <KycForm />
        </Col>
      </Row>
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
