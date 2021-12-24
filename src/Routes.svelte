<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Dashboard from './pages/admin/Dashboard.svelte'
  import Login from './pages/admin/Login.svelte'
  import Form from './pages/form/Form.svelte'

  const loggedInGuard = (invert?: boolean) => () => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    return username && password ? !invert : invert
  }

  const routes: Route[] = [
    {
      name: '/',
      component: Form,
    },
    {
      name: 'login',
      component: Login,
      onlyIf: {
        guard: loggedInGuard(true),
        redirect: '/dashboard',
      },
    },
    {
      name: 'dashboard',
      component: Dashboard,
      onlyIf: {
        guard: loggedInGuard(),
        redirect: '/login',
      },
    },
  ]
</script>

<Router {routes} />
