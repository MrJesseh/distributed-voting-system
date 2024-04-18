<script lang="ts">
	import { Button, Col, Container, Offcanvas, Row, Icon } from "@sveltestrap/sveltestrap";
	import { fade } from "svelte/transition";

	export let error: Error | null = null;
	export let toggleError: () => void = () => {};
	export let isErrorOpen: boolean = false;
</script>

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
				<Col><code>{error?.name}</code></Col>
			</Row>
			<Row>
				<Col><h6>Message:</h6></Col>
				<Col><code>{error?.message}</code></Col>
			</Row>
			<Row>
				<Col><h6>Cause:</h6></Col>
				<Col><code>{error?.cause}</code></Col>
			</Row>
			<Row><h6>Stack Trace:</h6></Row>
			<Row>
				<pre><code>{error?.stack}</code></pre>
			</Row>
		</Container>
	</Offcanvas>
</div>