<script setup lang="ts">
import { todosQuery } from '~/queries/todos'
import { nanoid } from 'nanoid'

definePageMeta({ middleware: 'auth' })

const newTodo = ref('')
const newTodoInput = useTemplateRef('new-todo')

const toast = useToast()
const queryCache = useQueryCache()
const { data: todos } = useQuery(todosQuery)

const { mutate: addTodo, isLoading: loading } = useMutation({
  mutation: (title: string) => {
    if (!title.trim()) throw new Error('Title is required')
    return $fetch('/api/todos', {
      method: 'POST',
      body: { title, completed: 0, slug: nanoid(10) }
    })
  },
  async onSuccess(todo) {
    await queryCache.invalidateQueries(todosQuery)
    toast.add({ title: `Todo "${todo.title}" created.` })
  },
  onSettled() {
    newTodo.value = ''
    nextTick().then(() => nextTick()).then(() => {
      newTodoInput.value?.input?.focus()
    })
  },
  onError(err) {
    console.error(err)
    toast.add({ title: 'Unexpected Error', color: 'red' })
  }
})

const { mutate: toggleTodo } = useMutation({
  mutation: (todo: Todo) =>
    $fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: { completed: Number(!todo.completed) }
    }),
  async onSuccess() {
    await queryCache.invalidateQueries(todosQuery)
  }
})

const { mutate: deleteTodo } = useMutation({
  mutation: (todo: Todo) =>
    $fetch(`/api/todos/${todo.id}`, { method: 'DELETE' }),
  async onSuccess(_res, todo) {
    await queryCache.invalidateQueries(todosQuery)
    toast.add({ title: `Todo "${todo.title}" deleted.` })
  }
})

const shareTodo = async (todo: Todo) => {
  if (!todo.slug) {
    todo.slug = nanoid(10)
    await $fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: { slug: todo.slug }
    })
    await queryCache.invalidateQueries(todosQuery)
  }
  const shareUrl = `${window.location.origin}/${todo.slug}`
  if (navigator.canShare && navigator.canShare({ url: shareUrl })) {
    try {
      await navigator.share({ title: 'Check out this note', text: todo.title, url: shareUrl })
      toast.add({ title: 'Shared successfully!' })
    } catch {
      toast.add({ title: 'Share cancelled', color: 'red' })
    }
  } else {
    await navigator.clipboard.writeText(shareUrl)
    toast.add({ title: 'Link copied to clipboard!' })
  }
}
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="addTodo(newTodo)">
    <div class="flex items-center gap-2">
      <UInput
        ref="new-todo"
        v-model="newTodo"
        name="todo"
        :disabled="loading"
        class="flex-1"
        placeholder="create a new note..."
        autocomplete="off"
        autofocus
        :ui="{ wrapper: 'flex-1' }"
      />
      <UButton
        type="submit"
        icon="i-lucide-plus"
        :loading="loading"
        :disabled="newTodo.trim().length === 0"
      />
    </div>

    <ul class="divide-y divide-gray-200 dark:divide-gray-800">
      <li v-for="todo of todos" :key="todo.id" class="flex items-center gap-2 py-2">
        <span class="flex-1 font-medium" :class="[todo.completed ? 'line-through text-gray-500' : '']">
          {{ todo.title }}
        </span>

        <USwitch :model-value="Boolean(todo.completed)" @update:model-value="toggleTodo(todo)" />

        <UButton
          color="primary"
          variant="soft"
          size="xs"
          icon="i-lucide-share-2"
          @click="shareTodo(todo)"
        />

        <UButton
          color="error"
          variant="soft"
          size="xs"
          icon="i-lucide-x"
          @click="deleteTodo(todo)"
        />
      </li>
    </ul>
  </form>
</template>



