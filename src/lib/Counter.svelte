<script lang="ts">
  import { type Writable, writable } from 'svelte/store'
  import { type DeepReadonly } from 'ts-essentials'

  const count: DeepReadonly<Writable<number>> = writable(0)

  const increment = () => {
    count.update(st => st + 1)
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
