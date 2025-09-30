import DashboardCards from '../components/DashboadCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TasksSummary from '../components/TasksSummary'
import WaterConsumptionSummary from '../components/WaterConsumptionSummary'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import { Task } from '../types/tasks'

const HomePage = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full space-y-6 px-8 py-16">
        <Header tasks={tasks as Task[]} title="Início" subtitle="Início" />
        <DashboardCards />

        <div className="grid grid-cols-3 gap-9">
          <TasksSummary />
          <WaterConsumptionSummary />
        </div>
      </main>
    </div>
  )
}

export default HomePage
