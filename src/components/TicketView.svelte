<gridLayout rows="auto, auto" class="ticket">
  <stackLayout row="0" class="ticket-header">
    <label text={ticket.eventName} class="event-name" />
  </stackLayout>

  <gridLayout row="1" rows="auto, auto, auto, auto" class="ticket-body">
    <gridLayout rows="auto" columns="*, *" row="0" class="info-row">
      <stackLayout col="0" class="info-item">
        <label text="Date" class="info-label" />
        <label text={formatDate(ticket.eventDate)} class="info-value" />
      </stackLayout>
      <stackLayout col="1" class="info-item">
        <label text="Time" class="info-label" />
        <label text={formatTime(ticket.eventDate)} class="info-value" />
      </stackLayout>
    </gridLayout>

    <gridLayout rows="auto" columns="*, *" row="1" class="info-row">
      <stackLayout col="0" class="info-item">
        <label text="Location" class="info-label" />
        <label text={ticket.eventLocation} class="info-value" textWrap="true" />
      </stackLayout>
      <stackLayout col="1" class="info-item">
        <label text="Price" class="info-label" />
        <label text={'$' + ticket.price.toFixed(2)} class="info-value" />
      </stackLayout>
    </gridLayout>

    <stackLayout row="2" class="qr-container">
      <image src={qrCodeUrl} class="qr-code" />
    </stackLayout>

    <stackLayout row="3" class="ticket-footer">
      <label text={`Ticket ID: ${ticket.id}`} class="ticket-id" />
      <label text={`Generated: ${formatDateTime(ticket.createdAt)}`} class="generated-date" />
    </stackLayout>
  </gridLayout>
</gridLayout>

<script lang="ts">
  import { onMount } from 'svelte';
  import { formatDate, formatTime, formatDateTime } from '../utils/date-formatter';
  import type { Ticket } from '../models/ticket.model';
  import { qrcodeService } from '../services/qrcode.service';

  export let ticket: Ticket;
  let qrCodeUrl = '';

  onMount(async () => {
    qrCodeUrl = await qrcodeService.generateQRCode(ticket.qrCode);
  });
</script>

<style>
  .ticket {
    background-color: white;
    border-radius: 10;
    margin: 10;
    elevation: 3;
  }
  .ticket-header {
    background-color: #4c51bf;
    padding: 15;
    border-top-left-radius: 10;
    border-top-right-radius: 10;
  }
  .event-name {
    color: white;
    font-size: 20;
    font-weight: bold;
  }
  .ticket-body {
    padding: 15;
  }
  .info-row {
    margin: 10 0;
  }
  .info-item {
    padding: 5;
  }
  .info-label {
    color: #666;
    font-size: 14;
  }
  .info-value {
    font-size: 16;
    font-weight: bold;
  }
  .qr-container {
    margin: 20 0;
    align-items: center;
  }
  .qr-code {
    width: 200;
    height: 200;
  }
  .ticket-footer {
    border-top-width: 1;
    border-top-color: #eee;
    padding-top: 10;
  }
  .ticket-id, .generated-date {
    color: #666;
    font-size: 12;
    text-align: center;
  }
</style>