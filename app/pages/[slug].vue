<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

const todo = ref<Todo | null>(null)
const loading = ref(false)

const toast = useToast()

const fetchTodo = async () => {
  loading.value = true
  try {
    const result: Todo = await $fetch(`/api/todos/${slug}`)
    todo.value = result
  } catch (err: any) {
    console.error(err)
    toast.add({ title: err.statusMessage || 'Note not found', color: 'red' })
    todo.value = null
  } finally {
    loading.value = false
  }
}

onMounted(fetchTodo)
</script>

<template>
  <div class="p-4">
    <div v-if="loading">Loading...</div>
    <div v-else-if="!todo" class="text-gray-500">Note not found.</div>
    <div v-else>
      <h1 class="text-xl font-bold mb-4">Shared Note</h1>
      <p
        class="py-2 font-medium"
        :class="[todo.completed ? 'line-through text-gray-500' : '']"
      >
        {{ todo.title }}
      </p>
    </div>
  </div>
</template>







