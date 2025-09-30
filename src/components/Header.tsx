import { useState } from 'react'

import { AddIcon, TrashIcon } from '../assets/icons'
import { useClearTasks } from '../hooks/data/use-clear-tasks'
import { Task } from '../types/tasks'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'

interface HeaderProps {
  title: string
  tasks: Task[]
  subtitle: string
}

const Header = ({ subtitle, title, tasks }: HeaderProps) => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)
  const { mutate: clearTasks } = useClearTasks(tasks)

  return (
    <div className="flex justify-between">
      <div className="space-y-1.5">
        <span className="text-semibold text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center gap-2.5">
        <Button color="ghost" size="small" onClick={() => clearTasks()}>
          Limpar tarefas <TrashIcon />
        </Button>

        <Button onClick={() => setAddTaskDialogIsOpen(true)}>
          Nova tarefa <AddIcon />
        </Button>

        <AddTaskDialog
          handleClose={() => setAddTaskDialogIsOpen(false)}
          isOpen={addTaskDialogIsOpen}
        />
      </div>
    </div>
  )
}

export default Header
