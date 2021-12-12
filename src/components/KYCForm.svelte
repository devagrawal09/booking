<script lang="ts">
  import { FormGroup, Input, Label } from 'sveltestrap'
</script>

<h2>Personal Information</h2>
<FormGroup>
  <Label for="fullName">Full Name</Label>
  <Input type="text" name="fullName" id="fullName" placeholder="Full Name" />
</FormGroup>

<FormGroup>
  <Label for="email">Email</Label>
  <Input type="email" name="email" id="email" placeholder="Email" />
</FormGroup>

<FormGroup>
  <Label for="dateOfBirth">Date of Birth</Label>
  <Input type="date" name="dateOfBirth" id="dateOfBirth" />
</FormGroup>

<FormGroup>
  <Label for="phoneNumber">Phone Number</Label>
  <Input
    type="tel"
    name="phoneNumber"
    id="phoneNumber"
    placeholder="Phone Number"
  />
</FormGroup>

<FormGroup>
  <Label for="address">Address</Label>
  <Input type="text" name="address" id="address" placeholder="Address" />
</FormGroup>

<FormGroup>
  <Label for="profession">Profession</Label>
  <Input
    type="radio"
    name="profession"
    value="student"
    label="Student"
    id="profession-student"
  />
  <Input
    type="radio"
    name="profession"
    value="business"
    label="Business"
    id="profession-business"
  />
  <Input
    type="radio"
    name="profession"
    value="service"
    label="Service"
    id="profession-service"
  />
</FormGroup>

<FormGroup>
  <Label for="purpose">Purpose of travel</Label>
  <Input
    type="radio"
    name="purpose"
    value="recreational"
    label="Recreational"
    id="purpose-recreational"
  />
  <Input
    type="radio"
    name="purpose"
    value="business"
    label="Business"
    id="purpose-business"
  />
  <Input
    type="radio"
    name="purpose"
    value="educational"
    label="Educational"
    id="purpose-educational"
  />
  <Input
    type="radio"
    name="purpose"
    value="other"
    label="Other"
    id="purpose-other"
  />
</FormGroup>
