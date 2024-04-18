<script lang="ts">
  import type { Poll } from "$lib/types";
  import { colors, findMaxIndex, sum } from "$lib";
  import {
    Badge, Button, Card, CardBody, CardTitle, Col, Container, Icon,
    ListGroup, ListGroupItem, Progress, Row
  } from "@sveltestrap/sveltestrap";

  export let poll: Poll;
  export let selectedOptions: Map<number, number>;
  export let selectOption: (pollId: number, optionIndex: number) => void;
  export let vote: (pollId: number) => Promise<void>;
</script>

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