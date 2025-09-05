// server/api/todos/[slug].get.ts

import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { slug } = getRouterParams(event)

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const todo = await useDB()
    .select()
    .from(tables.todos)
    .where(eq(tables.todos.slug, slug))
    .get()

  if (!todo) {
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  }

  return todo
})
