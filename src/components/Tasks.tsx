import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import TASKS from '../constants/tasks'
import { Task } from '../types/tasks'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(TASKS as Task[])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = (taskId: number) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      } else if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'complete' }
      } else if (task.status === 'complete') {
        toast.success('Tarefa reiniciada com sucesso!')
        return { ...task, status: 'not_started' }
      }

      return task
    })

    setTasks(newTasks)
  }

  const handleTaskDeleteClick = (taskId: number) => {
    const tasksWithoutDeletedTask: Task[] = tasks.filter(
      (task) => task.id !== taskId
    )
    setTasks(tasksWithoutDeletedTask)

    toast.success('Tarefa deletada com sucesso!')
  }

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
    toast.success('Tarefa adicionada com sucesso!')
  }

  return (
    <main className="w-full space-y-6 px-8 py-16">
      <div className="flex justify-between">
        <div className="space-y-1.5">
          <span className="text-semibold text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="ghost">
            Limpar tarefas <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefa <AddIcon />
          </Button>

          <AddTaskDialog
            handleClose={() => setAddTaskDialogIsOpen(false)}
            handleAdd={handleAddTask}
            isOpen={addTaskDialogIsOpen}
          />
        </div>
      </div>

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TaskItem
              handleDeleteClick={handleTaskDeleteClick}
              handleCheckboxClick={handleTaskCheckboxClick}
              key={task.id}
              task={task}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks.map((task) => (
            <TaskItem
              handleDeleteClick={handleTaskDeleteClick}
              handleCheckboxClick={handleTaskCheckboxClick}
              key={task.id}
              task={task}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />

          {eveningTasks.map((task) => (
            <TaskItem
              handleDeleteClick={handleTaskDeleteClick}
              handleCheckboxClick={handleTaskCheckboxClick}
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
