import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { Task } from '../types/tasks'
import Button from './Button'

interface TaskItemProps {
  task: Task
  handleCheckboxClick: (taskId: string) => void
}

const TaskItem = ({ task, handleCheckboxClick }: TaskItemProps) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['delete-task', task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      })
      return await response.json()
    },
  })

  const handleDelete = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) => {
          return oldTasks?.filter((oldTask) => oldTask.id !== task.id)
        })
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa')
      },
    })
  }

  const getClassesByStatus = () => {
    if (task.status === 'complete') {
      return 'bg-brand-primary text-sm font-medium text-brand-primary'
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue text-sm bg-opacity-10 font-medium text-brand-dark-gray'
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process text-sm font-medium text-brand-process'
    }
  }

  return (
    <div
      className={`flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 transition ${getClassesByStatus()}`}
    >
      <div className="flex items-center gap-3">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getClassesByStatus()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'complete'}
            className="absolute size-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === 'complete' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-brand-white" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDelete} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`} className="transition hover:opacity-75">
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
