<script>
  export let changePattern;
  import { Step } from '../../../../Classes.js';
</script>

<button class="db" on:click={() => {changePattern(new Array(16).fill(new Step(false)))}}>CLR</button>