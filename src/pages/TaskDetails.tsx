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
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useGetTask } from '../hooks/data/use-get-task'
import { useUpdateTask } from '../hooks/data/use-update-task'
import { TaskTime } from '../types/tasks'

export type UpdateTaskFormData = {
  title: string
  time: keyof typeof TaskTime
  description: string
}

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateTaskFormData>()

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  })
  const { mutate: updateTask, isPending: isEditingTask } = useUpdateTask(
    taskId!
  )
  const { mutate: deleteTask, isPending: isDeletingTask } = useDeleteTask(
    taskId!
  )

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleTaskUpdate = async (data: UpdateTaskFormData) => {
    updateTask(data, {
      onSuccess: () => {
        reset(data)
        toast.success('Tarefa editada com sucesso!')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const handleTaskDelete = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate('/')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
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
                to="/tasks"
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

          <Button
            color="danger"
            disabled={isDeletingTask || isEditingTask}
            onClick={handleTaskDelete}
          >
            {isDeletingTask ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            Deletar tarefa
          </Button>
        </div>

        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(handleTaskUpdate)}
        >
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

          <Button
            type="submit"
            className="self-end"
            color="primary"
            disabled={!isDirty || isEditingTask || isDeletingTask}
          >
            {isEditingTask && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
