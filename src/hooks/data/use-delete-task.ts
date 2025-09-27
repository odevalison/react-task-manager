import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-task', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete<Task>(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: ({ id: deletedTaskId }) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks?.filter((oldTask) => oldTask.id !== deletedTaskId)
      })
    },
  })
}
