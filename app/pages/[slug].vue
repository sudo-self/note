<script setup lang="ts">
import { useRoute } from 'vue-router'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const slug = route.params.slug as string

const todos = ref<Todo[]>([])
const loading = ref(false)

const toast = useToast()

const fetchTodos = async () => {
  loading.value = true
  try {
    const allTodos: Todo[] = await $fetch('/api/todos')
    todos.value = allTodos.filter(t => t.slug === slug)
    if (!todos.value.length) {
      toast.add({ title: 'Oops, note not found.', color: 'red' })
    }
  } catch (err) {
    console.error(err)
    toast.add({ title: 'Error fetching note', color: 'red' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodos)
</script>

<template>
  <div class="p-4">
    <div v-if="loading">Loading...</div>
    <div v-else-if="!todos.length" class="text-gray-500">Note not found.</div>
    <div v-else>
      <h1 class="text-xl font-bold mb-4">Shared Note</h1>
      <ul class="divide-y divide-gray-200 dark:divide-gray-800">
        <li
          v-for="todo of todos"
          :key="todo.id"
          class="py-2 font-medium"
          :class="[todo.completed ? 'line-through text-gray-500' : '']"
        >
          {{ todo.title }}
        </li>
      </ul>
    </div>
  </div>
</template>






