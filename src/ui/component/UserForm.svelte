<script lang="ts">
  import { useUserStorage } from '../../service/storageAdapter'
  import { Age, UserName, createUser } from '../../domain/user'
  import { useNotifier } from '../../service/notificationAdapter'

  const { updateUser } = useUserStorage()
  const { notify } = useNotifier()

  let name: string | null = null
  let age: string | null = null

  $: isEmpty = name === null || age === null || name === '' || age === ''

  function saveUser(event: SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    event.preventDefault()

    if(isEmpty) {
      notify('Empty fields')

      return
    }

    const user = createUser(
      UserName(name),
      Age(parseInt(age ?? '0'))
    )

    updateUser(user)

    name = null
    age = null

    notify(`successfully created user: ${user.name}`)
  }
</script>

<form on:submit={saveUser}>
  <label>Name: <input type="text" name="userName" bind:value={name} /></label>
  <label>Age: <input type="number" name="userAge" bind:value={age} /></label>
  <button disabled={isEmpty}>Submit</button>
</form>
