<stackLayout class="field">
  <label text={label} class="label" />
  <slot />
  {#if error}
    <label text={error} class="error" />
  {/if}
</stackLayout>

<script lang="ts">
  export let label: string;
  export let error: string = '';
</script>

<style>
  .field {
    margin-bottom: 16;
  }
  .label {
    font-size: 14;
    margin-bottom: 4;
  }
  .error {
    color: #dc3545;
    font-size: 12;
    margin-top: 4;
  }
</style>