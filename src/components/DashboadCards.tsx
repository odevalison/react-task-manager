import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import DashboardCard from './DashboardCard'

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

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
        mainText="50%"
        secondaryText="Água"
      />
    </div>
  )
}

export default DashboardCards
