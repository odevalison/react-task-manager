import { useQuery } from '@tanstack/react-query'

import { api } from '../../lib/axios'
import { Task } from '../../types/tasks'

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data: tasks } = await api.get<Task[]>('/tasks')
      return tasks
    },
  })
}
