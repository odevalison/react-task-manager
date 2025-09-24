import { HomeIcon, TasksIcon } from '../assets/icons'
import SidebarButton from './SidebarButton'

const Sidebar = () => {
  return (
    <aside className="h-dvh min-w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Um simples{' '}
          <span className="font-semibold text-brand-primary">
            organizador de tarefas
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton>
          <HomeIcon />
          Início
        </SidebarButton>

        <SidebarButton color="selected">
          <TasksIcon />
          Minhas tarefas
        </SidebarButton>
      </div>
    </aside>
  )
}

export default Sidebar
