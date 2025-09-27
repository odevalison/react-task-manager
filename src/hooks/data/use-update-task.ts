import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'
import { EditTaskFormData } from '../../pages/TaskDetails'
import { Task } from '../../types/tasks'

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['edit-task', taskId],
    mutationFn: async (data: EditTaskFormData) => {
      const newTaskData = {
        ...data,
        title: data.title.trim(),
        description: data.description.trim(),
      }
      const { data: updatedTask } = await api.patch<Task>(
        `/tasks/${taskId}`,
        newTaskData
      )
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
        return oldTasks?.map((currentOldTask) =>
          currentOldTask.id === taskId ? updatedTask : currentOldTask
        )
      })
      return updatedTask
    },
  })
}
