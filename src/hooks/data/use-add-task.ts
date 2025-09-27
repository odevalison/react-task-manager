import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-task'],
    mutationFn: async (task: Task) => {
      const { data: createdTask } = await api.post<Task>('/tasks', task)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks ? [...oldTasks, createdTask] : oldTasks
      })
    },
  })
}
