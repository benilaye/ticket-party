<stackLayout class="form">
  <FormField label="Event Name">
    <textField 
      bind:text={formData.eventName}
      hint="Enter event name"
      class="input"
    />
  </FormField>

  <FormField label="Event Date & Time">
    <gridLayout columns="*, *">
      <datePicker col="0" bind:date={eventDate} />
      <timePicker col="1" bind:time={eventTime} />
    </gridLayout>
  </FormField>

  <FormField label="Location">
    <textField 
      bind:text={formData.eventLocation}
      hint="Enter event location"
      class="input"
    />
  </FormField>

  <FormField label="Ticket Holder">
    <textField 
      bind:text={formData.ticketHolder}
      hint="Enter ticket holder name"
      class="input"
    />
  </FormField>

  <FormField label="Price">
    <textField 
      bind:text={priceText}
      hint="Enter ticket price"
      keyboardType="number"
      on:textChange={handlePriceChange}
      class="input"
    />
  </FormField>

  <button 
    text="Generate Ticket"
    class="btn btn-primary"
    on:tap={handleSubmit}
    isEnabled={isValid}
  />
</stackLayout>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FormField from '../ui/FormField.svelte';
  import { validateForm } from '../../utils/validation';
  import type { TicketFormData } from '../../models/form.model';

  const dispatch = createEventDispatcher();

  let eventDate = new Date();
  let eventTime = new Date();
  let priceText = '';

  let formData: TicketFormData = {
    eventName: '',
    eventDate: '',
    eventLocation: '',
    ticketHolder: '',
    price: 0
  };

  $: isValid = validateForm(formData);

  function handlePriceChange(args: any) {
    const value = parseFloat(args.value);
    formData.price = isNaN(value) ? 0 : value;
  }

  function handleSubmit() {
    if (!isValid) return;

    const dateTime = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
      eventTime.getHours(),
      eventTime.getMinutes()
    );

    dispatch('submit', {
      ...formData,
      eventDate: dateTime.toISOString()
    });

    resetForm();
  }

  function resetForm() {
    formData = {
      eventName: '',
      eventDate: '',
      eventLocation: '',
      ticketHolder: '',
      price: 0
    };
    priceText = '';
    eventDate = new Date();
    eventTime = new Date();
  }
</script>