<script lang="ts">
	import ioClient from 'socket.io-client';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import {
		Alert,
		Badge, Button, Card, CardBody, CardTitle, Col, type Color, Container, Icon, ListGroup,
		ListGroupItem, Offcanvas, Progress, Row, Styles
	} from '@sveltestrap/sveltestrap';

	import { sum, findMaxIndex, endpoint, colors, loadingMessages, randomItem, toSentenceCase } from '$lib';
	import type { Poll, AlertMessage } from '$lib/types';

	$: selectedOptions = new Map<number, number>();

	let polls: Poll[] = [];
	let isLoading: boolean = true;
	let error: Error | null = null;
	let isErrorOpen: boolean = false;
	let alerts: AlertMessage[] = [];
	const io = ioClient(endpoint, { transports: ["websocket"]});

	onMount(async () => {
		try {
			const response = await fetch(`${endpoint}/api/polls`);
			if (!response.ok) { // noinspection ExceptionCaughtLocallyJS
				throw new Error(`Error occurred while fetching polls!`);
			}
			polls = await response.json();
		} catch (err: unknown) {
			error = err as Error;
		} finally {
			isLoading = false;
		}
		// Listen for vote responses from the server.
		io.on('votes', async (newPoll: Poll) => {
			polls[polls.findIndex((poll) => poll.id === newPoll.id)] = newPoll;
			polls = polls;
		});
	});

	const toggleError = () => {
		isErrorOpen = !isErrorOpen;
	};

	const addAlert = (message: string, icon: string = 'patch-check', color: Color | string = 'success') => {
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

<Styles />

<Container md>
	<Row class="my-1">
		<h1 class="text-center">Anonymous Distributed Voting App</h1>
		<h4 class="text-center text-light-emphasis">Democracy as it should be.</h4>
	</Row>
	{#if isLoading}
		<div transition:fade={{ duration: 300, delay: 0 }}>
			<Row>
				<Progress striped color="primary" animated value={100} />
			</Row>
			<Row>
				<Col class="text-center">{toSentenceCase(randomItem(loadingMessages))}...</Col>
			</Row>
		</div>
	{:else if error}
		<div transition:fade={{ duration: 300, delay: 300 }}>
			<Row>
				<h1 class="text-center text-danger">
					<Icon name="patch-exclamation" />
				</h1>
			</Row>
			<Row><h2 class="text-center text-danger">It looks like we've run into an error.</h2></Row>
			<Row><h6 class="text-center text-light-emphasis">Please try again later.</h6></Row>
			<Row>
				<Col xs="4" />
				<Col xs="4" class="text-center">
					<Button color="danger" on:click={toggleError}>Show Error Message</Button>
				</Col>
				<Col xs="4" />
			</Row>
			<Offcanvas isOpen={isErrorOpen} toggle={toggleError}>
				<Container fluid>
					<Row><h1>Error Message</h1></Row>
					<Row>
						<Col><h6>Name:</h6></Col>
						<Col><code>{error.name}</code></Col>
					</Row>
					<Row>
						<Col><h6>Message:</h6></Col>
						<Col><code>{error.message}</code></Col>
					</Row>
					<Row>
						<Col><h6>Cause:</h6></Col>
						<Col><code>{error.cause}</code></Col>
					</Row>
					<Row><h6>Stack Trace:</h6></Row>
					<Row>
						<pre><code>{error.stack}</code></pre>
					</Row>
				</Container>
			</Offcanvas>
		</div>
	{:else}
		<div transition:fade={{ duration: 300, delay: 300 }}>
			{#each alerts as alert (alert.id)}
				<div transition:fade={{ duration: 300, delay: 0 }}>
					<Alert color={alert.color}>
						<Icon name={alert.icon} /> {alert.message}
					</Alert>
				</div>
			{/each}
			{#each polls as poll (poll.id)}
				<Row>
					<Card class="my-1">
						<CardBody>
							<Container fluid>
								<CardTitle>
									<Row>
										<Col class="flex-fill" xs="10">{poll.title}</Col>
										<Col>
											{#if poll.isOpen}
												<Badge color="primary">Open</Badge>
											{:else}
												<Badge color="danger">Closed</Badge>
											{/if}
										</Col>
									</Row>
								</CardTitle>
								<ListGroup>
									{#each poll.options as option, index}
										<ListGroupItem
											on:click={() => selectOption(poll.id, index)}
											color={selectedOptions.get(poll.id) === index || (!poll.isOpen && index === findMaxIndex(poll.results)) ? colors[index % colors.length] : ""}
											action={poll.isOpen}
											active={poll.isOpen && selectedOptions.get(poll.id) === index}
											disabled={!poll.isOpen && index !== findMaxIndex(poll.results)}>
											{option}
											{#if !poll.isOpen && index === findMaxIndex(poll.results)}
												<Icon name="check-circle" />
											{/if}
											<Progress
												color={colors[index]}
												value={(poll.results[index] / Math.max(1, sum(...poll.results))) * 100} />
										</ListGroupItem>
									{/each}
								</ListGroup>
								<Row class="text-center">
									<Col xs="4" />
									<Col xs="4">
										{#if poll.isOpen}
											<Button
												color="primary"
												disabled={selectedOptions.get(poll.id) === undefined}
												on:click={() => vote(poll.id)}
												class="my-1"
											>Vote
											</Button>
										{:else}
											<Button
												outline
												color="secondary"
												disabled
												class="my-1"
											>Poll Closed
											</Button>
										{/if}
									</Col>
									<Col xs="4" />
								</Row>
							</Container>
						</CardBody>
					</Card>
				</Row>
			{/each}
		</div>
	{/if}
</Container>
