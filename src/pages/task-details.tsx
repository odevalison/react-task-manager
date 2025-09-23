import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import type { Error } from '../components/AddTaskDialog'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'
import { Task, TaskTime } from '../types/tasks'

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()

  const [task, setTask] = useState<Task>({} as Task)
  const [errors, setErrors] = useState<Error[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const isNotSuccessResponse = !response.ok
      if (isNotSuccessResponse) {
        return navigate('/')
      }
      const taskData = await response.json()
      setTask(taskData)
    }
    fetchTaskData()
  }, [taskId, navigate])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleTaskEdit = async () => {
    setIsLoading(true)
    const currentErrors = [] as Error[]

    const title = titleRef.current?.value.trim() as string
    const time = timeRef.current?.value.trim() as keyof typeof TaskTime
    const description = descriptionRef.current?.value.trim() as string

    if (!title) {
      currentErrors.push({
        field: 'title',
        message: 'O título é obrigatório.',
      })
    }
    if (!time) {
      currentErrors.push({
        field: 'time',
        message: 'O horário é obrigatório.',
      })
    }
    if (!description) {
      currentErrors.push({
        field: 'description',
        message: 'A descrição é obrigatória',
      })
    }

    setErrors(currentErrors)
    const hasCurrentErrors = !!currentErrors.length
    if (hasCurrentErrors) {
      return setIsLoading(false)
    }

    const newTaskValues = { title, description, time }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify(newTaskValues),
    })
    const isNotSuccessResponse = !response.ok
    if (isNotSuccessResponse) {
      toast.error('Ocorreu um erro ao editar a tarefa, tente novamente')
      return setIsLoading(false)
    }

    toast.success('Tarefa editada com sucesso!')
    const newTaskData = await response.json()
    setTask(newTaskData)
    setIsLoading(false)
  }

  const titleError = errors.find((error) => error.field === 'title') as Error
  const timeError = errors.find((error) => error.field === 'time') as Error
  const descriptionError = errors.find(
    (error) => error.field === 'description'
  ) as Error

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
              <Link
                className="cursor-pointer text-brand-text-gray transition hover:text-brand-primary"
                to="/"
              >
                Minhas tarefas
              </Link>

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
          <Input
            label="Título"
            defaultValue={task.title}
            ref={titleRef}
            disabled={isLoading}
            error={titleError?.message}
          />

          <TimeSelect
            defaultValue={TaskTime[task.time]}
            ref={timeRef}
            disabled={isLoading}
            error={timeError?.message}
          />

          <Input
            label="Descrição"
            defaultValue={task.description}
            ref={descriptionRef}
            disabled={isLoading}
            error={descriptionError?.message}
          />
        </div>

        <Button
          className="flex items-center justify-center gap-2 justify-self-end"
          color="primary"
          onClick={handleTaskEdit}
          disabled={isLoading}
        >
          {isLoading && <LoaderIcon />}
          Salvar
        </Button>
      </div>
    </div>
  )
}

export default TaskDetailsPage
