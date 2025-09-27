import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Task } from '../../types/tasks'

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-task', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      const deletedTask: Task = await response.json()
      return deletedTask
    },
    onSuccess: ({ id: deletedTaskId }) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks?.filter((oldTask) => oldTask.id !== deletedTaskId)
      })
    },
  })
}
