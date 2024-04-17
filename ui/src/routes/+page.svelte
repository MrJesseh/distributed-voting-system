<script lang="ts">
	import {
		Badge,
		Button,
		Card,
		CardBody,
		CardTitle,
		Col,
		Container, ListGroup, ListGroupItem,
		Progress,
		Row,
		Styles
	} from '@sveltestrap/sveltestrap';
	import type { Poll } from '$lib/types';
	import type { Color } from '@sveltestrap/sveltestrap';

	const sum = (...arr: number[]) => [...arr].reduce((acc, val) => acc + val, 0);

	export const polls: Poll[] = [
		{
			id: 1,
			title: 'What is your favorite season?',
			options: ['Spring', 'Summer', 'Winter'],
			results: [123, 789, 456],
			isOpen: true
		},
		{
			id: 2,
			title: 'What is your preferred pet?',
			options: ['Dog', 'Cat', 'Bird'],
			results: [100, 50, 10],
			isOpen: true
		},
		{
			id: 3,
			title: 'Which cuisine do you prefer?',
			options: ['Italian', 'Chinese', 'Mexican'],
			results: [75, 50, 150],
			isOpen: true
		},
		{
			id: 4,
			title: 'What type of music do you prefer?',
			options: ['Rock', 'Pop', 'Jazz'],
			results: [100, 90, 50],
			isOpen: true
		},
		{
			id: 5,
			title: 'What kind of movies do you prefer?',
			options: ['Action', 'Comedy', 'Drama'],
			results: [90, 100, 70],
			isOpen: false
		}
	];
	export const colors: Color[] = ['success', 'warning', 'danger'];
</script>

<Styles />

<Container md>
	<Row class="my-1">
		<h1 class="text-center">Anonymous Distributed Voting App</h1>
		<h2 class="text-center text-light-emphasis">Democracy as it should be.</h2>
	</Row>
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
								<ListGroupItem color={colors[index]}>
									{option}
									<Progress
										color={colors[index]}
										value={(poll.results[index] / Math.max(1, sum(...poll.results))) * 100} />
								</ListGroupItem>
							{/each}
						</ListGroup>
						<Row class="my-1" />
						<Row class="text-center">
							<Col xs="4" />
							<Col xs={{ size: 4 }}>
								{#if poll.isOpen}
									<Button color="primary">Vote</Button>
								{:else}
									<Button outline color="secondary" disabled>Poll Closed</Button>
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
