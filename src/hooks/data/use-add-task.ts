import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import type { Task } from '../../types/tasks'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['addTask'],
    mutationFn: async (task: Task) => {
      const { data: createdTask } = await api.post<Task>('/tasks', task)
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks ? [...oldTasks, createdTask] : oldTasks
      })
    },
  })
}
