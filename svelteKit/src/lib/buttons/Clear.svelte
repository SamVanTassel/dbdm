<script>
  export let changePattern;
  import { Step } from '../../../../Classes.js';
</script>

<button class="db" on:click={() => {changePattern(new Array(16).fill('').map(()=> new Step(false)))}}>CLR</button>