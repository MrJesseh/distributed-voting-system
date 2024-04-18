<script lang="ts">
  import { Alert, Icon } from "@sveltestrap/sveltestrap";
  import { fade } from "svelte/transition";
  import type { AlertMessage } from "$lib/types";

  export let alerts: AlertMessage[];
</script>

{#each alerts as alert (alert.id)}
  <div transition:fade={{ duration: 300, delay: 0 }}>
    <Alert color={alert.color}>
      <Icon name={alert.icon} /> {alert.message}
    </Alert>
  </div>
{/each}