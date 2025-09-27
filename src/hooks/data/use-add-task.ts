import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import type { Task } from '../../types/tasks'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-task'],
    mutationFn: async (task: Task) => {
      const { data: createdTask } = await axios.post<Task>(
        'http://localhost:3000/tasks',
        task
      )
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks ? [...oldTasks, createdTask] : oldTasks
      })
    },
  })
}
