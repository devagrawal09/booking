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
</script>

<h2>Booking Information</h2>
<FormGroup>
  <Label for="type">Booking Type</Label>
  <Input type="select" name="type" id="type">
    <option>Hourly</option>
    <option>Daily</option>
  </Input>
</FormGroup>

<FormGroup>
  <Label for="date">Booking date and time</Label>
  <Input
    type="datetime-local"
    name="date"
    id="date"
    placeholder="Booking date and time"
  />
</FormGroup>

<Row>
  <Col>
    <Card>
      <Label for="maestro">
        <CardHeader>
          <CardTitle>
            <Input
              type="checkbox"
              name="maestro"
              id="maestro"
              label="Hero Maestro"
            />
          </CardTitle>
        </CardHeader>
      </Label>
      <CardBody>
        <Image src="/assets/maestro.png" fluid alt="Hero Maestro" />
      </CardBody>
    </Card>
  </Col>
</Row>
