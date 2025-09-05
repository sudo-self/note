<script setup lang="ts">
import { todosQuery } from '~/queries/todos'
import { useRoute } from 'vue-router'
import { useToast } from '#imports'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const slug = route.params.slug as string
const toast = useToast()
const queryCache = useQueryCache()

// Fetch all todos
const { data: todos } = useQuery(todosQuery)

// Find the note with matching slug
const note = computed(() => todos.value?.find(t => t.slug === slug))

if (!note.value) {
  toast.add({ title: 'Note not found', color: 'red' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-4">
    <div v-if="note" class="bg-white dark:bg-gray-900 shadow rounded-lg p-6 w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-4">{{ note.title }}</h1>
      <p class="mb-2"><strong>Completed:</strong> {{ note.completed ? 'Yes' : 'No' }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Note slug: <code>{{ note.slug }}</code>
      </p>
    </div>

    <div v-else class="text-center text-red-500">
      <h2 class="text-xl font-semibold mb-2">Oops! Note not found.</h2>
      <p>Check your URL or create a new note.</p>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: sans-serif;
  background-color: var(--body-bg, #f9fafb);
  color: var(--text-color, #111);
}
</style>
