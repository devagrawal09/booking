<script lang="ts">
  import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from 'sveltestrap'
  import type { BookingVm } from '../../../services/vms'

  export let isOpen: boolean,
    toggle: () => void,
    confirm: (booking: BookingVm) => Promise<void>,
    oldBooking: BookingVm,
    newBooking: BookingVm

  let working = false,
    error = ''

  const work = async (booking: BookingVm) => {
    if (working) return
    working = true
    try {
      await confirm(booking)
    } catch (err) {
      console.error(err)
      error = err.message
    } finally {
      working = false
    }
  }
</script>

<Modal {isOpen} {toggle} size="lg">
  <ModalHeader {toggle}>Confirm change</ModalHeader>
  <ModalBody>
    Change booking <strong>{oldBooking.reference}</strong> <br />
    from
    <strong>
      {oldBooking.vehicle.name};
      {new Date(oldBooking.startDate).toLocaleString()};
      {new Date(oldBooking.endDate).toLocaleString()}
    </strong> <br />
    to
    <strong>
      {newBooking.vehicle.name};
      {new Date(newBooking.startDate).toLocaleString()};
      {new Date(newBooking.endDate).toLocaleString()}
    </strong>
    {#if error}
      <br />
      <strong>{error}</strong>
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button color="dark" on:click={toggle}>No, Go Back</Button>
    <Button
      color="primary"
      on:click={() => work(newBooking)}
      disabled={working}
    >
      Yes, Change
    </Button>
  </ModalFooter>
</Modal>
