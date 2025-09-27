import { useQuery } from '@tanstack/react-query'

import { Task } from '../../types/tasks'

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      return await response.json()
    },
  })
}
