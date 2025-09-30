import { useContext } from 'react'

import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons'
import { WaterConsumptionContext } from '../context/water-consumption'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import DashboardCard from './DashboardCard'

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()
  const { totalConsumedInMl, goalConsumptionInMl } = useContext(
    WaterConsumptionContext
  )

  const waterConsumedPercent = (totalConsumedInMl / goalConsumptionInMl) * 100
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const completeTasks = tasks?.filter(
    (task) => task.status === 'complete'
  ).length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length as number}
        secondaryText="Tarefas disponíveis"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completeTasks as number}
        secondaryText="Tarefas concluídas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks as number}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText={`${waterConsumedPercent}%`}
        secondaryText="Água"
      />
    </div>
  )
}

export default DashboardCards
