import { useQuery } from '@tanstack/react-query'

import type { Task } from '../../types/tasks'

interface UseGetTaskProps {
  taskId: string | undefined
  onSuccess: (task: Task) => void
}

export const useGetTask = ({ onSuccess, taskId }: UseGetTaskProps) => {
  return useQuery<Task>({
    queryKey: ['task'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const task: Task = await response.json()
      onSuccess(task)
      return task
    },
  })
}
