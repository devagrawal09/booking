<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import type { Route } from 'svelte-router-spa/types/components/router'
  import Dashboard from './pages/admin/Dashboard/Dashboard.svelte'
  import Login from './pages/admin/Login.svelte'
  import Landing from './pages/form/Landing.svelte'

  const loggedInGuard = (invert?: boolean) => () => {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    return username && password ? !invert : invert
  }

  const routes: Route[] = [
    {
      name: '/',
      component: Landing,
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
