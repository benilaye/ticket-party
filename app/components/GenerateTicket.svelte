<scrollView>
  <stackLayout class="p-4">
    <label text="Create Event Ticket" class="h2 text-center" />
    
    <gridLayout rows="auto, auto, auto, auto, auto, auto" class="form">
      <stackLayout row="0" class="input-field">
        <label text="Event Name" />
        <textField bind:text={formData.eventName} hint="Enter event name" />
      </stackLayout>

      <stackLayout row="1" class="input-field">
        <label text="Event Date" />
        <datePicker bind:date={eventDate} />
        <timePicker bind:time={eventTime} />
      </stackLayout>

      <stackLayout row="2" class="input-field">
        <label text="Location" />
        <textField bind:text={formData.eventLocation} hint="Enter event location" />
      </stackLayout>

      <stackLayout row="3" class="input-field">
        <label text="Ticket Holder" />
        <textField bind:text={formData.ticketHolder} hint="Enter ticket holder name" />
      </stackLayout>

      <stackLayout row="4" class="input-field">
        <label text="Price" />
        <textField 
          bind:text={priceText} 
          hint="Enter ticket price" 
          keyboardType="number" 
          on:textChange={handlePriceChange}
        />
      </stackLayout>

      <button 
        row="5" 
        text="Generate Ticket" 
        class="btn btn-primary" 
        on:tap={generateTicket} 
        isEnabled={isFormValid}
      />
    </gridLayout>

    {#if latestTicket}
      <TicketView ticket={latestTicket} />
    {/if}
  </stackLayout>
</scrollView>

<script lang="ts">
  import { ticketStore } from '../stores/ticket.store';
  import TicketView from './TicketView.svelte';
  import type { Ticket } from '../models/ticket.model';

  let eventDate = new Date();
  let eventTime = new Date();
  let priceText = '';
  let latestTicket: Ticket | null = null;

  let formData = {
    eventName: '',
    eventLocation: '',
    ticketHolder: '',
    price: 0
  };

  $: isFormValid = formData.eventName && 
                   formData.eventLocation && 
                   formData.ticketHolder && 
                   formData.price > 0;

  function handlePriceChange(args: any) {
    const value = parseFloat(args.value);
    formData.price = isNaN(value) ? 0 : value;
  }

  function generateTicket() {
    if (!isFormValid) return;

    const dateTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      eventTime.getHours(),
      eventTime.getMinutes()
    );

    latestTicket = ticketStore.createTicket({
      ...formData,
      eventDate: dateTime.toISOString()
    });

    // Reset form
    formData = {
      eventName: '',
      eventLocation: '',
      ticketHolder: '',
      price: 0
    };
    priceText = '';
    eventDate = new Date();
    eventTime = new Date();
  }
</script>

<style>
  .form {
    margin: 20 0;
  }
  .input-field {
    margin-bottom: 15;
  }
  .btn {
    margin: 20 0;
  }
</style>