import { buildRoutePath } from './utils/build-route-path.js'

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: () => {}
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: () => {}
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: () => {}
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: () => {}
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: () => {}
  }
]