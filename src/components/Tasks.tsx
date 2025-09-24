import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import { Task } from '../types/tasks'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TasksSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      return await response.json()
    },
  })

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = async (taskId: string) => {
    const newTasks = tasks?.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'complete' }
      }
      if (task.status === 'complete') {
        toast.success('Tarefa reiniciada com sucesso!')
        return { ...task, status: 'not_started' }
      }
      return task
    }) as Task[]
    queryClient.setQueryData<Task[]>(['tasks'], newTasks)
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
          <Button color="ghost" size="small">
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

      <div className="space-y-6 rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator text="Manhã" icon={<SunIcon />} />
          {!morningTasks?.length && (
            <p className="text-xs font-medium text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã
            </p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              handleCheckboxClick={handleTaskCheckboxClick}
              key={task.id}
              task={task}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Tarde" icon={<CloudSunIcon />} />
          {!afternoonTasks?.length && (
            <p className="text-xs font-medium text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde
            </p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              handleCheckboxClick={handleTaskCheckboxClick}
              key={task.id}
              task={task}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator text="Noite" icon={<MoonIcon />} />
          {!eveningTasks?.length && (
            <p className="text-xs font-medium text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite
            </p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
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

export default Tasks
