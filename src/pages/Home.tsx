import DashboardCards from '../components/DashboadCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskItem from '../components/TaskItem'
import { useGetTasks } from '../hooks/data/use-get-tasks'

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full space-y-6 px-8 py-16">
        <Header title="Início" subtitle="Início" />
        <DashboardCards />

        <div className="grid grid-cols-3 gap-9">
          <div className="col-span-2 space-y-6 rounded-[10px] bg-brand-white p-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-dark-blue">
                Tarefas
              </h3>
              <span className="text-sm text-brand-text-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>

            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem status={task.status} task={task} key={task.id} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
