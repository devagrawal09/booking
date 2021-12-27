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
    booking: BookingVm

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
  <ModalHeader {toggle}>Confirm cancellation</ModalHeader>
  <ModalBody>
    Cancel booking <strong>{booking.reference}</strong>? <br />
    Booking is of
    <strong>{booking.vehicle.name}</strong>
    from
    <strong>{new Date(booking.startDate).toLocaleString()}</strong>
    to
    <strong>{new Date(booking.endDate).toLocaleString()}.</strong>
    {#if error}
      <br />
      <strong>{error}</strong>
    {/if}
  </ModalBody>
  <ModalFooter>
    <Button color="dark" on:click={toggle}>No, Go Back</Button>
    <Button color="primary" on:click={() => work(booking)} disabled={working}>
      Yes, Cancel
    </Button>
  </ModalFooter>
</Modal>
