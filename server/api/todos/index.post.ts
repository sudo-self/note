import { useValidatedBody, z } from 'h3-zod'
import { nanoid } from 'nanoid'

export default eventHandler(async (event) => {
  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  })
  const { user } = await requireUserSession(event)


  const slug = nanoid(10)


  const todo = await useDB()
    .insert(tables.todos)
    .values({
      userId: user.id,
      title,
      slug,         
      createdAt: new Date()
    })
    .returning()
    .get()

  return todo
})

