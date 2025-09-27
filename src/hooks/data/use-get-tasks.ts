import { useQuery } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import { Task } from '../../types/tasks'

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get<Task[]>('/tasks')
      return tasks
    },
  })
}
