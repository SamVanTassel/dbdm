<script lang='ts'>
  export let changeWords;
  export let changePattern;
  export let bank;
  export let slot;
  export let trackIndex;
  
  const loadPattern = (bank, slot) => {
    fetch(`/memory/${bank}/${slot}`)
      .then(response => response.json())
      .then(res => {
        changePattern(res.pattern);
        changeWords(trackIndex, res.name);
      })
      .catch(err => console.log(err));
  }
</script>

<button class="db" on:click={() => loadPattern(bank, slot)}>LOAD</button>