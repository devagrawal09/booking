<script lang="ts">
  import { FormGroup, Input, Label } from 'sveltestrap'
</script>

<h2>Personal Information</h2>
<FormGroup>
  <Label for="fullName">Full Name</Label>
  <Input
    type="text"
    name="fullName"
    id="fullName"
    placeholder="Full Name"
    required
  />
</FormGroup>

<FormGroup>
  <Label for="email">Email</Label>
  <Input type="email" name="email" id="email" placeholder="Email" required />
</FormGroup>

<FormGroup>
  <Label for="dateOfBirth">Date of Birth</Label>
  <Input type="date" name="dateOfBirth" id="dateOfBirth" required />
</FormGroup>

<FormGroup>
  <Label for="phone">Phone Number</Label>
  <Input
    type="tel"
    name="phone"
    id="phone"
    placeholder="Phone Number"
    required
  />
</FormGroup>

<FormGroup>
  <Label for="address">Address</Label>
  <Input
    type="text"
    name="address"
    id="address"
    placeholder="Address"
    required
  />
</FormGroup>

<FormGroup>
  <Label for="profession">Profession</Label>
  <Input
    type="radio"
    name="profession"
    value="student"
    label="Student"
    id="profession-student"
    required
  />
  <Input
    type="radio"
    name="profession"
    value="business"
    label="Business"
    id="profession-business"
    required
  />
  <Input
    type="radio"
    name="profession"
    value="service"
    label="Service"
    id="profession-service"
    required
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
    required
  />
  <Input
    type="radio"
    name="purpose"
    value="educational"
    label="Educational"
    id="purpose-educational"
    required
  />
  <Input
    type="radio"
    name="purpose"
    value="other"
    label="Other"
    id="purpose-other"
    required
  />
</FormGroup>
