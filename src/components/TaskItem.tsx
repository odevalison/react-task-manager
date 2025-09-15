import { useState } from 'react'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { Task } from '../types/tasks'
import Button from './Button'

interface TaskItemProps {
  task: Task
  handleDeleteTaskSuccess: (taskId: string) => void
  handleCheckboxClick: (taskId: string) => void
}

export default function TaskItem({
  task,
  handleCheckboxClick,
  handleDeleteTaskSuccess,
}: TaskItemProps) {
  const [isBeingDeleted, setIsBeingDeleted] = useState<boolean>(false)

  const handleDelete = async () => {
    setIsBeingDeleted(true)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })

    const isNotSuccessResponse = !response.ok
    if (isNotSuccessResponse) {
      setIsBeingDeleted(false)
      toast.error('Erro ao excluir a tarefa, tente novamente.')
      return
    }

    handleDeleteTaskSuccess(task.id)
    setIsBeingDeleted(false)
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
        <Button
          variant={{ color: 'ghost' }}
          onClick={handleDelete}
          disabled={isBeingDeleted}
        >
          {isBeingDeleted ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}
