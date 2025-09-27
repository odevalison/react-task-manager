import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Task } from '../../types/tasks'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['add-task'],
    mutationFn: async (task: Task) => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error('Erro ao adicionar tarefa')
      }
      const createdTask: Task = await response.json()
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks ? [...oldTasks, createdTask] : oldTasks
      })
    },
  })
}
