import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { Task } from '../../types/tasks'

export const useGetTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data: tasks } = await axios.get<Task[]>(
        'http://localhost:3000/tasks'
      )
      return tasks
    },
  })
}
