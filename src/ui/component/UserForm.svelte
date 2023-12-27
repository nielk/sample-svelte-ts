<script lang="ts">
  import { Age, createUser, UserName } from '../../domain/user'
  import { useUserStorage } from '../../service/storageAdapter'

  const { updateUser } = useUserStorage()

  let name: string | null = null
  let age: string | null = null

  $: isEmpty = name === null || age === null || name === '' || age === ''

  function saveUser(
    event: SubmitEvent & {
      currentTarget: EventTarget & HTMLFormElement
    }
  ) {
    event.preventDefault()

    if (isEmpty) {
      // notify('Empty fields')

      return
    }

    const user = createUser(UserName(name), Age(parseInt(age ?? '0')))

    updateUser(user)

    name = null
    age = null

    // notify(`successfully created user: ${user.name}`)
  }
</script>

<form on:submit={saveUser}>
  <label>Name: <input type="text" name="userName" bind:value={name} /></label>
  <label>Age: <input type="number" name="userAge" bind:value={age} /></label>
  <button disabled={isEmpty}>Submit</button>
</form>
