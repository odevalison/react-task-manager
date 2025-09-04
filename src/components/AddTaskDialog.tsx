import './AddTaskDialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Button from './Button'
import Input from './Input'

interface AddTaskDialogProps {
  isOpen: boolean
  handleClose: () => void
}

export default function AddTaskDialog({
  isOpen,
  handleClose,
}: AddTaskDialogProps) {
  const nodeRef = useRef<HTMLDivElement>(null)

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
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/10 backdrop-blur"
          >
            <div className="w-[336px] max-w-[400px] space-y-4 rounded-xl bg-white p-5 text-center shadow">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-[#35383E]">
                  Nova Tarefa
                </h2>
                <p className="text-sm text-[#9A9C9F]">
                  Insira as informações abaixo
                </p>
              </div>

              <div className="flex w-full flex-col space-y-4">
                <Input
                  label="Título"
                  id="title"
                  placeholder="Título da tarefa"
                />
                <Input label="Horário" id="time" placeholder="Selecione" />
                <Input
                  label="Descrição"
                  id="description"
                  placeholder="Descreva a tarefa"
                />

                <div className="flex gap-3 *:flex-1">
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button size="lg">Salvar</Button>
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
