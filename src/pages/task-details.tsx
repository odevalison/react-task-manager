import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'
import { Task, TaskTime } from '../types/tasks'

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()
  const [task, setTask] = useState<Task>({} as Task)

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const isNotSuccessResponse = !response.ok
      if (isNotSuccessResponse) {
        return navigate('/')
      }
      setTask(await response.json())
    }
    fetchTaskData()
  }, [taskId, navigate])

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full items-end justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex size-7 items-center justify-center rounded-full bg-brand-primary text-brand-white transition hover:opacity-75"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <span
                className="cursor-pointer text-brand-text-gray transition hover:text-brand-primary"
                onClick={handleBackClick}
              >
                Minhas tarefas
              </span>

              <ChevronRightIcon className="text-brand-text-gray" />

              <span className="font-semibold text-brand-primary">
                {task.title}
              </span>
            </div>

            <h1 className="mt-1.5 text-xl font-semibold text-brand-dark-blue">
              {task.title}
            </h1>
          </div>

          <Button color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <Input label="Título" value={task.title} />
          <TimeSelect value={TaskTime[task.time]} />
          <Input label="Descrição" value={task.description} />
        </div>

        <div className="flex w-full items-center justify-end gap-2.5">
          <Button color="secondary">Cancelar</Button>
          <Button color="primary">Salvar</Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
