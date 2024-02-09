import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { title, description } = request.body

      if(!title) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'Title is required'})
        )
      }

      if(!description) {
        return response.writeHead(400).end(
          JSON.stringify({ message: 'Description is required'})
        )
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      database.insert('tasks', task)

      return writeHead(201).end(
        JSON.stringify({ message: 'Task created!'})
      )
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (request, response) => {
      const { search } = request.query

      const tasks = database.select('tasks', search ? {
        name: search,
        email: search
      } : null)

      return response.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: () => {
      const { id } = request.params
      const { title, description } = request.body

      if(!title && !description) {
        return response.writeHead(400).end( 
          JSON.stringify({ message: 'Title and description are required' })
        )
      }

      const [task] = database.select('tasks', { id })

      if(!task) {
        return response.writeHead(404).end(
          JSON.stringify({ message: 'No task found! '})
        )
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date()
      })

      return response.writeHead(204).end(
        JSON.stringify({ message: 'The task was successfully updated!'})
      )
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (request, response) => {
      const { id } = request.params

      const [task] = database.select('tasks', { id })

      if(!task) {
        return response.writeHead(404).end(
          JSON.stringify({ message: 'No task found!' })
        )
      }

      const isTaskCompleted = !!task.completed_at
      const completed_at = isTaskCompleted ? null : new Date()

      database.update('tasks', id, { completed_at })
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: () => {
      const { id } = req.params

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end()
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]