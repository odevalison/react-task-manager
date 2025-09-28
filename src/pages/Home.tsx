import DashboardCards from '../components/DashboadCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TasksSummary from '../components/TasksSummary'

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full space-y-6 px-8 py-16">
        <Header title="Início" subtitle="Início" />
        <DashboardCards />

        <div className="grid grid-cols-3 gap-9">
          <TasksSummary />
        </div>
      </main>
    </div>
  )
}

export default HomePage
