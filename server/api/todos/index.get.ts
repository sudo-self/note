import { eq } from 'drizzle-orm'
import { useDB, tables } from '~/server/db'

export default eventHandler(async (event) => {
  try {
    const { user } = await requireUserSession(event)
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const todos = await useDB()
      .select({
        id: tables.todos.id,
        title: tables.todos.title,
        completed: tables.todos.completed,
        slug: tables.todos.slug,
        createdAt: tables.todos.createdAt
      })
      .from(tables.todos)
      .where(eq(tables.todos.userId, user.id))
      .all()

    return todos
  } catch (err: any) {
    console.error('GET /api/todos failed:', err)
    throw createError({ statusCode: 500, message: err.message || 'Server Error' })
  }
})


