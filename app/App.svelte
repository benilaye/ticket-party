<frame>
  <page>
    <actionBar title="Event Ticket Generator" />
    <bottomNavigation bind:selectedIndex={selectedIndex}>
      <tabStrip>
        <tabStripItem>
          <label text="Generate" />
        </tabStripItem>
        <tabStripItem>
          <label text="Scan" />
        </tabStripItem>
      </tabStrip>

      <tabContentItem>
        <GenerateTicket />
      </tabContentItem>
      <tabContentItem>
        <ScanTicket />
      </tabContentItem>
    </bottomNavigation>
  </page>
</frame>

<script lang="ts">
  import GenerateTicket from './components/GenerateTicket.svelte';
  import ScanTicket from './components/ScanTicket.svelte';

  let selectedIndex = 0;
</script>