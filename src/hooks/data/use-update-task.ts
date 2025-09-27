import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

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
      const { data: updatedTask } = await axios.patch<Task>(
        `http://localhost:3000/tasks/${taskId}`,
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
