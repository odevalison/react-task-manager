import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { Task } from '../../types/tasks'

interface UseGetTaskProps {
  taskId: string | undefined
  onSuccess: (task: Task) => void
}

export const useGetTask = ({ onSuccess, taskId }: UseGetTaskProps) => {
  return useQuery<Task>({
    queryKey: ['task'],
    queryFn: async () => {
      const { data: task } = await axios.get(
        `http://localhost:3000/tasks/${taskId}`
      )
      onSuccess(task)
      return task
    },
  })
}
