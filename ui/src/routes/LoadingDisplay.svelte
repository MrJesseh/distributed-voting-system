<script>
  import { fade } from 'svelte/transition';
  import { loadingMessages, randomItem, toSentenceCase } from '$lib';
  import { Col, Progress, Row } from '@sveltestrap/sveltestrap';
</script>

<div transition:fade={{ duration: 300, delay: 0 }}>
  <Row>
    <Progress striped color="primary" animated value={100} />
  </Row>
  <Row>
    <Col class="text-center">{toSentenceCase(randomItem(loadingMessages))}...</Col>
  </Row>
</div>