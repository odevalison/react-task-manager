import './AddTaskDialog.css'

import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 as uuidv4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { Task, TaskTime } from '../types/tasks'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

interface AddTaskDialogProps {
  isOpen: boolean
  handleClose: () => void
  handleCreateTaskSuccess: (task: Task) => void
  handleCreateTaskError: () => void
}

export type Error = {
  field: string
  message: string
}

export default function AddTaskDialog({
  isOpen,
  handleClose,
  handleCreateTaskSuccess,
  handleCreateTaskError,
}: AddTaskDialogProps) {
  const [errors, setErrors] = useState<Error[]>([])
  const [isCreatingTask, setIsCreatingTask] = useState(false)

  const nodeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)

  const handleCreateTask = async () => {
    setIsCreatingTask(true)
    const currentErrors = [] as Error[]

    const title = titleRef.current?.value.trim() as string
    const description = descriptionRef.current?.value.trim() as string
    const time = timeRef.current?.value.trim() as TaskTime

    if (!title) {
      currentErrors.push({
        field: 'title',
        message: 'O título é obrigatório.',
      })
    }
    if (!description) {
      currentErrors.push({
        field: 'description',
        message: 'A descrição é obrigatória.',
      })
    }
    if (!time) {
      currentErrors.push({
        field: 'time',
        message: 'O horário é obrigatório.',
      })
    }
    setErrors(currentErrors)
    const hasCurrentErrors = !!currentErrors.length
    if (hasCurrentErrors) {
      setIsCreatingTask(false)
      return
    }
    const newTask: Task = {
      title,
      description,
      time,
      id: uuidv4(),
      status: 'not_started',
    }
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
    })
    const isNotSuccessResponse = !response.ok
    if (isNotSuccessResponse) {
      setIsCreatingTask(false)
      return handleCreateTaskError()
    }
    handleCreateTaskSuccess(newTask)
    setIsCreatingTask(false)
    handleClose()
  }

  const titleError = errors.find((error) => error.field === 'title') as Error
  const descriptionError = errors.find(
    (error) => error.field === 'description'
  ) as Error
  const timeError = errors.find((error) => error.field === 'time') as Error

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

              <div className="flex w-full flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Título da tarefa"
                  disabled={isCreatingTask}
                  error={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect error={timeError?.message} ref={timeRef} />

                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                  disabled={isCreatingTask}
                  error={descriptionError?.message}
                  ref={descriptionRef}
                />

                <div className="flex gap-3 *:flex-1">
                  <Button
                    variant={{ color: 'secondary', size: 'large' }}
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant={{ size: 'large' }}
                    onClick={handleCreateTask}
                    disabled={isCreatingTask}
                  >
                    {isCreatingTask && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </>
    </CSSTransition>
  )
}
