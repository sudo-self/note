import { useValidatedBody, z } from 'h3-zod'
import { nanoid } from 'nanoid'
import { useDB, tables } from '~/server/db'
import { requireUserSession } from '~/server/utils/auth'

export default eventHandler(async (event) => {
  try {
    const { title } = await useValidatedBody(event, {
      title: z.string().min(1).max(100)
    })
    const { user } = await requireUserSession(event)
    if (!user) throw createError({ statusCode: 401, message: 'Unauthorized' })

    const slug = nanoid(10)

    const todo = await useDB()
      .insert(tables.todos)
      .values({
        userId: user.id,
        title,
        completed: 0,
        slug,
        createdAt: new Date()
      })
      .returning()
      .get()

    return todo
  } catch (err: any) {
    console.error('POST /api/todos failed:', err)
    throw createError({ statusCode: 500, message: err.message || 'Server Error' })
  }
})




