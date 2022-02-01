<script lang='ts'>
  export let changeWords;
  export let bank: string;
  export let slotNum: number;
  export let trackIndex: number;
  export let pattern;
  export let words: string[];

  const savePattern = (bank: string, slotNum: number, pattern) => {
    fetch(`/memory/${bank}/${slotNum}`, 
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
  on:click={() => savePattern(bank, slotNum, pattern)}>
  SAVE
</button>