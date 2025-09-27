import { useMutation, useQueryClient } from '@tanstack/react-query'

import { EditTaskFormData } from '../../pages/TaskDetails'
import { Task } from '../../types/tasks'

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['edit-task', taskId],
    mutationFn: async (data: EditTaskFormData) => {
      const newTaskData = {
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify(newTaskData),
      })
      if (!response.ok) {
        throw new Error('Erro ao editar tarefa')
      }
      const updatedTask: Task = await response.json()
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks?.map((currentOldTask) =>
          currentOldTask.id === taskId ? updatedTask : currentOldTask
        )
      })
      return updatedTask
    },
  })
}
