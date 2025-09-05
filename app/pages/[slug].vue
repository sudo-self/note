<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '#app'
import { todosQuery } from '~/queries/todos'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const slug = route.params.slug as string

definePageMeta({ middleware: 'auth' })

const newTodo = ref('')
const newTodoInput = useTemplateRef('new-todo')
const todos = ref<Todo[]>([])
const loading = ref(false)
const queryCache = useQueryCache()


const fetchTodos = async () => {
  try {
    loading.value = true
    const allTodos: Todo[] = await $fetch('/api/todos')
    todos.value = allTodos.filter(todo => todo.slug === slug)
    if (!todos.value.length) {
      toast.add({ title: 'Oops, note not found.', color: 'red' })
      // optionally redirect back to home
      // router.push('/')
    }
  } catch (err) {
    console.error(err)
    toast.add({ title: 'Error fetching note', color: 'red' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodos)


const { mutate: addTodo } = useMutation({
  mutation: async (title: string) => {
    if (!title.trim()) throw new Error('Title is required')
    const slugToUse = slug || nanoid(10)
    return $fetch('/api/todos', {
      method: 'POST',
      body: { title, completed: 0, slug: slugToUse }
    })
  },

  async onSuccess() {
    await fetchTodos()
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
  mutation: async (todo: Todo) =>
    $fetch(`/api/todos/${todo.id}`, {
      method: 'PATCH',
      body: { completed: Number(!todo.completed) }
    }),
  async onSuccess() {
    await fetchTodos()
  }
})


const { mutate: deleteTodo } = useMutation({
  mutation: async (todo: Todo) =>
    $fetch(`/api/todos/${todo.id}`, { method: 'DELETE' }),
  async onSuccess() {
    await fetchTodos()
  }
})


const shareTodo = async (todo: Todo) => {
  const shareUrl = `${window.location.origin}/${todo.slug}`
  if (navigator.canShare && navigator.canShare({ url: shareUrl })) {
    try {
      await navigator.share({ title: 'Check out this note', text: todo.title, url: shareUrl })
      toast.add({ title: 'Shared successfully!' })
    } catch (err) {
      console.error(err)
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
        placeholder="Add a new note..."
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
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex items-center gap-2 py-2"
      >
        <span
          class="flex-1 font-medium"
          :class="[todo.completed ? 'line-through text-gray-500' : '']"
        >{{ todo.title }}</span>

        <USwitch
          :model-value="Boolean(todo.completed)"
          @update:model-value="toggleTodo(todo)"
        />

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

