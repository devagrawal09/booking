<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Dashboard from './pages/admin/Dashboard.svelte'
  import Login from './pages/admin/Login.svelte'
  import Form from './pages/form/Form.svelte'

  const loggedInGuard = () => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    return !!(username && password)
  }

  const routes: Route[] = [
    {
      name: '/',
      component: Form,
    },
    {
      name: 'login',
      component: Login,
    },
    {
      name: 'dashboard',
      component: Dashboard,
      onlyIf: {
        guard: loggedInGuard,
        redirect: '/login',
      },
    },
  ]
</script>

<Router {routes} />
