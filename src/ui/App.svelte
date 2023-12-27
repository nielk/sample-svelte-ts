<script lang="ts">
  import type { Readable } from 'svelte/store'
  import type { Note } from 'webmidi'

  import type { GameService } from '_/application/ports'

  import viteLogo from '../../public/vite.svg'
  import UserForm from './component/UserForm.svelte'

  export let lastNote: Readable<Note | undefined>
  export let game: Readonly<GameService>

  const notesToGuess = game.GameGuessNote.play()
  $: currentNoteIterator = notesToGuess.next()
  $: currentNoteToGuess = currentNoteIterator.value
  $: console.log(currentNoteToGuess)

  lastNote.subscribe(playedNote => {
    if (
      playedNote !== undefined &&
      currentNoteToGuess !== undefined &&
      playedNote.name === currentNoteToGuess.name
    ) {
      console.log('Yay! Good note')
      currentNoteIterator = notesToGuess.next()
    } else {
      console.log('wrong note, try again')
    }
  })
</script>

<main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
  </div>
  <h1>Vite + Svelte: {$lastNote?.name ?? 'no note played yet'}</h1>
  <h2>Guess: {currentNoteToGuess?.name}</h2>

  <div class="card">
    <UserForm />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .read-the-docs {
    color: #888;
  }
</style>
