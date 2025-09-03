import { useState } from 'react'
import AddIcon from '../assets/icons/add.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import Button from './Button'
import TasksSeparator from './TasksSeparator'
import TASKS from '../constants/tasks'
import { Task } from '../types/tasks'
import TaskItem from './TaskItem'

export default function Tasks() {
  const [tasks] = useState<Task[]>(TASKS as Task[])

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  return (
    <main className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div className="space-y-1.5">
          <span className="text-semibold text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="ghost">
            Limpar tarefas <TrashIcon />
          </Button>
          <Button>
            Nova tarefa <AddIcon />
          </Button>
        </div>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />

          {eveningTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  )
}
