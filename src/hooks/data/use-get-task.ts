import { useQuery } from '@tanstack/react-query'

import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

interface UseGetTaskProps {
  taskId: string | undefined
  onSuccess: (task: Task) => void
}

export const useGetTask = ({ onSuccess, taskId }: UseGetTaskProps) => {
  return useQuery<Task>({
    queryKey: ['task'],
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)
      onSuccess(task)
      return task
    },
  })
}
