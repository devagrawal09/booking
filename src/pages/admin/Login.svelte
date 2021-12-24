<script lang="ts">
  import { Container, Form, FormGroup, Label, Input, Button } from 'sveltestrap'
  import { navigateTo } from 'svelte-router-spa'

  const login = (username: string, password: string) => {
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    navigateTo('dashboard')
  }

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const username = form.username.value
    const password = form.password.value
    login(username, password)
  }
</script>

<Container>
  <Form on:submit={onSubmit}>
    <FormGroup>
      <Label for="username">Username</Label>
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Enter username"
      />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
      />
    </FormGroup>
    <Button color="primary">Submit</Button>
  </Form>
</Container>
