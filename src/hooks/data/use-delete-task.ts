import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import type { Task } from '../../types/tasks'

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-task', taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await axios.delete<Task>(
        `http://localhost:3000/tasks/${taskId}`
      )
      return deletedTask
    },
    onSuccess: ({ id: deletedTaskId }) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks?.filter((oldTask) => oldTask.id !== deletedTaskId)
      })
    },
  })
}
