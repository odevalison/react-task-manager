import { useQuery } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

interface UseGetTaskProps {
  taskId: string | undefined
  onSuccess: (task: Task) => void
}

export const useGetTask = ({ onSuccess, taskId }: UseGetTaskProps) => {
  return useQuery<Task>({
    queryKey: taskQueryKeys.getOne(taskId!),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId!}`)
      onSuccess(task)
      return task
    },
  })
}
