<script>
  export let changeWords;
  export let changePattern;
  export let bank;
  export let slot;
  export let trackIndex;
  
  // Helper function to convert data from string to array for frontend components
  function dataStringToArray(string) {
    const arr = string.split('')
    return arr.map((el) => {
      if (el === 'X') return true;
      if (el === '.') return false;
    });
  };

  const loadPattern = (bank, slot) => {
    fetch(`/memory/${bank}/${slot}`)
      .then(response => response.json())
      .then(res => {
        changePattern(dataStringToArray(res.pattern));
        changeWords(trackIndex, res.name);
      })
      .catch(err => console.log(err));
  }
</script>

<button class="db" on:click={() => loadPattern(bank, slot)}>LOAD</button>