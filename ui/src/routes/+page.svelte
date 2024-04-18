<script lang="ts">
	import { fade } from "svelte/transition";
	import {
		Alert,
		Badge, Button, Card, CardBody, CardTitle, Col, type Color, Container, Icon, ListGroup,
		ListGroupItem, Progress, Row, Styles
	} from '@sveltestrap/sveltestrap';

	import { sum, findMaxIndex, polls, colors } from '$lib';
	import type { AlertMessage } from '$lib/types';

	$: selectedOptions = new Map<number, number>();

	let alerts: AlertMessage[] = [];

	const addAlert = (message: string, icon: string = "patch-check", color: Color | string = "success") => {
		const alert: AlertMessage = {
			id: new Date().getTime(),
			message,
			icon,
			color
		};
		alerts = [...alerts, alert];
		setTimeout(() => {
			alerts = alerts.filter(a => a.id !== alert.id)
		}, 3000);
	}

	const selectOption = (pollId: number, optionIndex: number) => {
		selectedOptions.set(pollId, optionIndex);
		// This line is NOT to be removed. It looks stupid, but it's 100% necessary.
		// JS Maps are not reactive by default in Svelte; they're aiming to fix this in Svelte 5, but
		// for now, we have to reassign the variable to itself to make it notice that a change has
		// happened.
		selectedOptions = selectedOptions;
		console.log(`Option ${optionIndex} of poll ${pollId} selected`);
		console.log(selectedOptions);
	};

	const vote = (pollId: number) => {
		if (selectedOptions.has(pollId)) {
			// We can safely assume that it has the pollId in the Map because of the if statement.
			const optionIndex = selectedOptions.get(pollId) as number;
			const option = polls.find(p => p.id === pollId)?.options[optionIndex];
			console.log(`Vote recorded for poll ${pollId}.`);
			addAlert(`Your vote for "${option}" has been recorded!`);
		}
	};
</script>

<Styles />

<Container md>
	<Row class="my-1">
		<h1 class="text-center">Anonymous Distributed Voting App</h1>
		<h2 class="text-center text-light-emphasis">Democracy as it should be.</h2>
	</Row>
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
									color={selectedOptions.get(poll.id) === index || (!poll.isOpen && index === findMaxIndex(poll.results)) ? colors[index] : ""}
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
									>Vote</Button>
								{:else}
									<Button
										outline
										color="secondary"
										disabled
										class="my-1"
									>Poll Closed</Button>
								{/if}
							</Col>
							<Col xs="4" />
						</Row>
					</Container>
				</CardBody>
			</Card>
		</Row>
	{/each}
</Container>
