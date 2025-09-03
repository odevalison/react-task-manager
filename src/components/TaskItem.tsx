import CheckIcon from '../assets/icons/check.svg?react'
import DetailsIcon from '../assets/icons/details.svg?react'
import LoaderIcon from '../assets/icons/loader.svg?react'
import { Task } from '../types/tasks'

interface TaskItemProps {
  task: Task
  handleCheckboxClick: (taskId: number) => void
}

export default function TaskItem({ task, handleCheckboxClick }: TaskItemProps) {
  const getClassesByStatus = () => {
    switch (task.status) {
      case 'complete':
        return 'bg-[#00ADB5] text-sm font-medium text-[#002C2E]'
      case 'not_started':
        return 'bg-[#35383E] text-sm bg-opacity-10 font-medium text-[#35383E]'
      case 'in_progress':
        return 'bg-[#FFAA04] text-sm font-medium text-black/60'
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
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <a href="#" className="transition hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}
