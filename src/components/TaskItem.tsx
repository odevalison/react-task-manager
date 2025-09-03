import { Task } from '../types/tasks'

interface TaskItemProps {
  task: Task
}

export default function TaskItem({ task }: TaskItemProps) {
  const getClassesByStatus = () => {
    switch (task.status) {
      case 'complete':
        return 'bg-[#00ADB5]/10 text-sm font-medium text-[#002C2E]'
      case 'in_progress':
        return 'bg-[#35383E]/5 text-sm font-medium text-[#35383E]'
      case 'not_started':
        return 'bg-[#FFAA04]/10 text-sm font-medium text-black/60'
    }
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-4 py-3 ${getClassesByStatus()}`}
    >
      {task.title}
    </div>
  )
}
