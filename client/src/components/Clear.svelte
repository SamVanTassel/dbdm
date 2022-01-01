<script>
  export let changePattern;
</script>

<button class="db" on:click={() => {changePattern(new Array(16).fill(false))}}>CLR</button>