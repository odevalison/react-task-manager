import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'
import { type Task, TaskTime } from '../types/tasks'

type EditTaskFormData = {
  title: string
  time: keyof typeof TaskTime
  description: string
}

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()
  const [task, setTask] = useState<Task>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditTaskFormData>()

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data: Task = await response.json()
      setTask(data)
      reset(data)
    }

    fetchTaskData()
  }, [taskId, reset])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleTaskEdit = async (data: EditTaskFormData) => {
    const response = await fetch(`http://localhost:3000/tasks/${task?.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao editar a tarefa')
    }

    const taskData: Task = await response.json()
    setTask(taskData)
    reset(taskData)
    toast.success('Tarefa editada com sucesso!')
  }

  const handleTaskDelete = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task?.id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa')
    }

    toast.success('Tarefa deletada com sucesso!')
    navigate('/')
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
              <Link
                className="cursor-pointer text-brand-text-gray transition hover:text-brand-primary"
                to="/"
              >
                Minhas tarefas
              </Link>

              <ChevronRightIcon className="text-brand-text-gray" />

              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-1.5 text-xl font-semibold text-brand-dark-blue">
              {task?.title}
            </h1>
          </div>

          <Button color="danger" onClick={handleTaskDelete}>
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(handleTaskEdit)}
        >
          {/* Dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <Input
              {...register('title', {
                required: 'O título é obrigatório',
                validate: (value) => {
                  return !value.trim() ? 'O título não pode ser vazio.' : true
                },
              })}
              error={errors.title?.message}
              label="Título"
            />

            <TimeSelect
              {...register('time', {
                required: 'O horário é obrigatório',
                validate: (value) => {
                  return !value.trim() ? 'O horário não pode ser vazio.' : true
                },
              })}
              error={errors.time?.message}
            />

            <Input
              {...register('description', {
                required: 'A descrição é obrigatória',
                validate: (value) => {
                  return !value.trim()
                    ? 'A descrição não pode ser vazia.'
                    : true
                },
              })}
              error={errors.description?.message}
              label="Descrição"
            />
          </div>
          {/* Botão de salvar */}
          <Button
            type="submit"
            className="self-end"
            color="primary"
            disabled={!isDirty || isSubmitting}
          >
            {isSubmitting && <LoaderIcon />}
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
