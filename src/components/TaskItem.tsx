import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useUpdateTask } from '../hooks/data/use-update-task'
import type { Task, TaskStatus } from '../types/tasks'
import Button from './Button'

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id as string)
  const { mutate: updateTask } = useUpdateTask(task.id as string)

  const getNewStatus = (): TaskStatus | undefined => {
    if (task.status === 'complete') {
      return 'not_started'
    }
    if (task.status === 'in_progress') {
      return 'complete'
    }
    if (task.status === 'not_started') {
      return 'in_progress'
    }
  }

  const handleDelete = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa')
      },
    })
  }

  const handleUpdate = (task: Task) => {
    const status = getNewStatus()

    updateTask(
      { ...task, status },
      {
        onSuccess: () => {
          toast.success('Status da tarefa atualizado com sucesso!')
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  }

  const getClassesByStatus = () => {
    if (task.status === 'complete') {
      return 'bg-brand-primary text-sm font-medium text-brand-primary'
    } else if (task.status === 'not_started') {
      return 'bg-brand-dark-blue text-sm bg-opacity-10 font-medium text-brand-dark-gray'
    } else if (task.status === 'in_progress') {
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
            onChange={() => handleUpdate(task)}
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
