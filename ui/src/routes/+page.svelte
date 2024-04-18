<script lang="ts">
  import ioClient from "socket.io-client";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { type Color, Container, Styles } from "@sveltestrap/sveltestrap";

  import { endpoint } from "$lib";
  import type { Poll, AlertMessage } from "$lib/types";
  import ErrorDisplay from "./ErrorDisplay.svelte";
  import Alerts from "./Alerts.svelte";
  import Header from "./Header.svelte";
  import PollDisplay from "./PollDisplay.svelte";
  import LoadingDisplay from "./LoadingDisplay.svelte";

  $: selectedOptions = new Map<number, number>();

  let polls: Poll[] = [];
  let isLoading: boolean = true;
  let error: Error | null = null;
  let isErrorOpen: boolean = false;
  let alerts: AlertMessage[] = [];

  const io = ioClient(endpoint, { transports: ["websocket"] });

  onMount(async () => {
    try {
      const response = await fetch(`${endpoint}/api/polls`);
      if (!response.ok) { // noinspection ExceptionCaughtLocallyJS
        throw new Error(`Error occurred while fetching polls!`);
      }
      setTimeout(async () => {
        polls = await response.json();
      }, 300);
    } catch (err: unknown) {
      error = err as Error;
    } finally {
      isLoading = false;
    }
    // Listen for vote responses from the server.
    io.on("votes", async (newPoll: Poll) => {
      polls[polls.findIndex((poll) => poll.id === newPoll.id)] = newPoll;
      polls = polls;
    });
  });

  const toggleError = () => {
    isErrorOpen = !isErrorOpen;
  };

  const addAlert = (message: string, icon: string = "patch-check", color: Color | string = "success") => {
    const alert: AlertMessage = {
      id: new Date().getTime(),
      message,
      icon,
      color
    };
    alerts = [...alerts, alert];
    setTimeout(() => {
      alerts = alerts.filter(a => a.id !== alert.id);
    }, 3000);
  };

  const selectOption = (pollId: number, optionIndex: number) => {
    if (!selectedOptions.has(pollId) || selectedOptions.get(pollId) !== optionIndex) {
      selectedOptions.set(pollId, optionIndex);
    } else {
      selectedOptions.delete(pollId);
    }
    // This line is NOT to be removed. It looks stupid, but it's 100% necessary.
    // JS Maps are not reactive by default in Svelte; they're aiming to fix this in Svelte 5, but
    // for now, we have to reassign the variable to itself to make it notice that a change has
    // happened.
    selectedOptions = selectedOptions;
  };

  const vote = async (pollId: number) => {
    if (selectedOptions.has(pollId)) {
      // We can safely assume that it has the pollId in the Map because of the if statement.
      const optionIndex = selectedOptions.get(pollId) as number;
      await fetch(`${endpoint}/api/polls`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          "id": pollId,
          "option": optionIndex
        })
      });
      const option = polls.find(p => p.id === pollId)?.options[optionIndex];
      addAlert(`Your vote for "${option}" has been recorded!`);
    }
  };
</script>

<svelte:head>
  <title>Anonymous Distributed Voting System</title>
</svelte:head>

<Styles />

<Container md>
  <Header />
  {#if isLoading}
    <LoadingDisplay />
  {:else if error}
    <ErrorDisplay {error} {toggleError} {isErrorOpen} />
  {:else}
    <div transition:fade={{ duration: 300, delay: 300 }}>
      <Alerts {alerts} />
      {#each polls as poll (poll.id)}
        <PollDisplay {poll} {selectedOptions} {selectOption} {vote} />
      {/each}
    </div>
  {/if}
</Container>
