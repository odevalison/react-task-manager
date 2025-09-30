import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import { Task } from '../../types/tasks'

export const useClearTasks = (tasks: Task[]) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.clearAll(),
    mutationFn: async () => {
      await Promise.all(
        tasks.map((task: Task) => api.delete(`/tasks/${task.id}`))
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.getAll() })
    },
  })
}
