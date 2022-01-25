<script lang='ts'>
  export let changeWords;
  export let bank: string;
  export let slot: number;
  export let trackIndex: number;
  export let pattern;
  export let words: string[];

  const savePattern = (bank: string, slot: number, pattern) => {
    fetch(`/memory/${bank}/${slot}`, 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          pattern: pattern,
          name: words[trackIndex] 
        })
      })
      .then(response => response.json())
      .then(res => {
        if (res.name) changeWords(trackIndex, res.name)
        else changeWords(trackIndex, 'xxxx');
      })
      .catch(err => console.log(err));
  }
</script>

<button 
  class="db" 
  on:click={() => savePattern(bank, slot, pattern)}>
  SAVE
</button>