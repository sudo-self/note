import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)


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

  return todos as Todo[]
})

