import DashboardCards from '../components/DashboadCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TasksSummary from '../components/TasksSummary'
import WaterConsumption from '../components/WaterConsumption'
import WaterSubgoals from '../components/WaterSubgoals'

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full space-y-6 px-8 py-16">
        <Header title="Início" subtitle="Início" />
        <DashboardCards />

        <div className="grid grid-cols-3 gap-9">
          <TasksSummary />

          <div className="space-y-6 rounded-[10px] bg-brand-white p-6">
            <div>
              <h3 className="text-xl font-semibold text-brand-dark-blue">
                Água
              </h3>
              <span className="text-sm text-brand-text-gray">
                Beba sua meta diária de água
              </span>
            </div>

            <div className="flex justify-between">
              <WaterSubgoals />
              <WaterConsumption />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
