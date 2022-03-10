<script>

const blocks = new Array(16).fill('X');
</script>

<h1>New Page</h1>
{#each blocks as block}
<div>{block}</div>
{/each}


<style lang="scss">

</style>