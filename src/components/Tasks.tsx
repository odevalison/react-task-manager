import Button from './Button'
import AddIcon from '../assets/icons/add.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import CloudSunIcon from '../assets/icons/cloud-sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'

export default function Tasks() {
  return (
    <main className="w-full space-y-6 px-8 py-16">
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

      {/* Lista de tarefas */}

      <div className="space-y-6 rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <div className="mb-3 flex items-center gap-1.5 border-b border-[#F4F4F5] pb-1.5 text-[#9A9C9F]">
            <SunIcon />
            <p className="text-sm font-semibold">Manhã</p>
          </div>
        </div>

        {/* Tarde */}
        <div className="space-y-3">
          <div className="mb-3 flex items-center gap-1.5 border-b border-[#F4F4F5] pb-1.5 text-[#9A9C9F]">
            <CloudSunIcon />
            <p className="text-sm font-semibold">Tarde</p>
          </div>
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-[#F4F4F5] pb-1.5 text-[#9A9C9F]">
            <MoonIcon />
            <p className="text-sm font-semibold">Noite</p>
          </div>
        </div>
      </div>
    </main>
  )
}
