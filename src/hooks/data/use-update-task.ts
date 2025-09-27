import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import { EditTaskFormData } from '../../pages/TaskDetails'
import { Task } from '../../types/tasks'

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateTask', taskId],
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
      queryClient.setQueryData<Task[]>(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks?.map((currentOldTask) =>
          currentOldTask.id === taskId ? updatedTask : currentOldTask
        )
      })
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask)
    },
  })
}
