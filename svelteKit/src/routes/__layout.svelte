<script lang="ts">
	import Header from '$lib/header/Header.svelte';

</script>
<nav>
<a href='/melodic'>Melodic</a>
<a href='/rhythmic'>Rhythmic</a>
<a href='/'>home</a>
</nav>

<main>
	<slot />
</main>

<!-- <footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer> -->

<style global lang="scss">
  @import "../styles.scss";

  html {
    box-sizing: border-box;
    height: 100%;
  }
  body {
    overflow: hidden;
    display: flex;
    flex-direction: column;
	  justify-content: space-between;
    min-height: 100%;
    font-family: $text;
    background: $background-main;
    background: linear-gradient(180deg, $background-dark 0%, $background-main 20%, $background-main 70%, $background-dark 100%);
  }
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
  h1 {
    font-size: 6rem;
    margin: .5rem;
    padding: .25rem;
    text-shadow: 4px 4px $background-dark;
  }
  body:before {
    content: '';
    flex: 1;
  }
  body:after {
    flex: 2;
    content: '';
  }
  #root {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #main {
    width: 95%;
    background-color: $background-main;
    color: $wheat-main;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    box-shadow: 2px 2px 4px $background-dark, -2px -2px 4px $background-dark;
    max-width: 1350px;
  }
</style>