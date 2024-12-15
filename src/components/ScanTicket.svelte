<stackLayout class="p-4">
  <label text="Scan QR Code" class="h2 text-center" />
  
  {#if !isScanning}
    <button text="Start Scanner" class="btn btn-primary" on:tap={startScanning} />
  {:else}
    <button text="Stop Scanner" class="btn btn-secondary" on:tap={stopScanning} />
  {/if}

  {#if message}
    <label 
      text={message} 
      class="message" 
      className={messageType === 'success' ? 'text-success' : 'text-danger'} 
    />
  {/if}
</stackLayout>

<script lang="ts">
  import { scannerService } from '../services/scanner.service';
  import { ticketStore } from '../stores/ticket.store';
  import { MESSAGES } from '../config/constants';

  let isScanning = false;
  let message = '';
  let messageType: 'success' | 'error' = 'success';

  async function startScanning() {
    try {
      const available = await scannerService.checkAvailability();
      if (available) {
        isScanning = true;
        const qrCode = await scannerService.scan();

        if (qrCode) {
          const validation = ticketStore.validateTicket(qrCode);
          message = validation.message;
          messageType = validation.valid ? 'success' : 'error';
        }
      } else {
        message = MESSAGES.SCAN_UNAVAILABLE;
        messageType = 'error';
      }
    } catch (error) {
      console.error('Scanning error:', error);
      message = MESSAGES.SCAN_ERROR;
      messageType = 'error';
    } finally {
      isScanning = false;
    }
  }

  function stopScanning() {
    scannerService.stop();
    isScanning = false;
  }
</script>

<style>
  .message {
    margin: 20;
    font-size: 16;
    text-align: center;
  }
  .text-success {
    color: #28a745;
  }
  .text-danger {
    color: #dc3545;
  }
</style>