import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { tv, VariantProps } from 'tailwind-variants'

import { DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useUpdateTask } from '../hooks/data/use-update-task'
import type { Task, TaskStatus } from '../types/tasks'
import Button from './Button'
import TaskItemCheckbox from './TaskItemCheckbox'

const taskItem = tv({
  base: 'flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 transition',
  variants: {
    status: {
      not_started:
        'bg-brand-dark-blue bg-opacity-5 text-sm font-medium text-brand-dark-gray',
      in_progress: 'bg-brand-process text-sm font-medium text-brand-process',
      complete: 'bg-brand-primary text-sm font-medium text-brand-primary',
    },
  },
  defaultVariants: { status: 'not_started' },
})

type TaskItemVariants = VariantProps<typeof taskItem>

interface TaskItemProps extends TaskItemVariants {
  task: Task
}

const TaskItem = ({ task, status }: TaskItemProps) => {
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

  return (
    <div className={taskItem({ status })}>
      <div className="flex items-center gap-3">
        <TaskItemCheckbox status={status} onChange={() => handleUpdate(task)} />
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
