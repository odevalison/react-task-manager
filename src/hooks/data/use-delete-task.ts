import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete<Task>(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: ({ id: deletedTaskId }) => {
      queryClient.setQueryData<Task[]>(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks?.filter((oldTask) => oldTask.id !== deletedTaskId)
      })
    },
  })
}
