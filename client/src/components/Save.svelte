<script>
  export let changeWords;
  export let bank;
  export let slot;
  export let trackIndex;
  export let pattern;
  export let words;

  // Send pattern as string of X's (true) and .'s (false) for server-side legibility and easy comparison
  const savePattern = (bank, slot, pattern) => {
    fetch(`/memory/${bank}/${slot}`, 
      { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          'pattern': pattern.join('').replace(/true/g, 'X').replace(/false/g, '.'),
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