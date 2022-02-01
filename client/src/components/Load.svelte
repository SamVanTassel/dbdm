<script lang='ts'>
  export let changeWords;
  export let changePattern;
  export let bank: string;
  export let slotNum: number;
  export let trackIndex: number;
  
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

<button class="db" on:click={() => loadPattern(bank, slotNum)}>LOAD</button>