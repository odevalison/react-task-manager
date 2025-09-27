import './AddTaskDialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddTask } from '../hooks/data/use-add-task'
import { Task, TaskTime } from '../types/tasks'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

interface AddTaskDialogProps {
  isOpen: boolean
  handleClose: () => void
}

type AddTaskDialogFormData = {
  title: string
  time: keyof typeof TaskTime
  description: string
}

const AddTaskDialog = ({ isOpen, handleClose }: AddTaskDialogProps) => {
  const { mutate: addTask } = useAddTask()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddTaskDialogFormData>({
    defaultValues: { description: '', time: 'morning', title: '' },
  })
  const nodeRef = useRef<HTMLDivElement>(null)

  const handleAddTask = async (data: AddTaskDialogFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time,
      status: 'not_started',
    }

    addTask(newTask, {
      onSuccess: () => {
        handleClose()
        reset({ description: '', time: 'morning', title: '' })
        toast.success('Tarefa adicionada com sucesso!')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  const handleCancelClick = () => {
    reset({ description: '', time: 'morning', title: '' })
    handleClose()
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      nodeRef={nodeRef}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="min-w-96 max-w-full space-y-4 rounded-xl bg-white p-5 text-center shadow">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-brand-dark-blue">
                  Nova Tarefa
                </h2>

                <p className="text-sm text-brand-text-gray">
                  Insira as informações abaixo
                </p>
              </div>

              <form
                onSubmit={handleSubmit(handleAddTask)}
                className="flex w-full flex-col space-y-4"
              >
                <Input
                  error={errors.title?.message}
                  disabled={isSubmitting}
                  label="Título"
                  placeholder="Título da tarefa"
                  {...register('title', {
                    required: 'O título é obrigatório',
                    validate: (value) => {
                      return !value.trim()
                        ? 'O título não pode ser vazio.'
                        : true
                    },
                  })}
                />

                <TimeSelect
                  error={errors.time?.message}
                  disabled={isSubmitting}
                  {...register('time', {
                    required: 'O horário é obrigatório',
                    validate: (value) => {
                      return !value.trim()
                        ? 'O horário não pode ser vazio.'
                        : true
                    },
                  })}
                />

                <Input
                  error={errors.description?.message}
                  disabled={isSubmitting}
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  {...register('description', {
                    required: 'A descrição é obrigatória',
                    validate: (value) => {
                      return !value.trim()
                        ? 'A descrição não pode ser vazia.'
                        : true
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    onClick={handleCancelClick}
                    disabled={isSubmitting}
                    type="button"
                    color="secondary"
                    size="large"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>

                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    size="large"
                    className="flex-1"
                  >
                    {isSubmitting && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  )
}

export default AddTaskDialog
