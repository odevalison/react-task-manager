import Button from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'

export default function Tasks() {
  return (
    <main className="w-full px-8 py-16">
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
    </main>
  )
}
