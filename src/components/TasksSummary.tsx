import { useGetTasks } from '../hooks/data/use-get-tasks'
import TaskItem from './TaskItem'

const TasksSummary = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div className="col-span-2 h-fit space-y-6 rounded-[10px] bg-brand-white p-6">
      <div>
        <h3 className="text-xl font-semibold text-brand-dark-blue">Tarefas</h3>
        <span className="text-sm text-brand-text-gray">
          Resumo das tarefas disponíveis
        </span>
      </div>

      <div className="space-y-3">
        {tasks?.map((task) => (
          <TaskItem status={task.status} task={task} key={task.id} />
        ))}
        {!tasks?.length && (
          <p className="text-sm font-medium text-brand-text-gray">
            Nenhuma tarefa cadastrada no momento.
          </p>
        )}
      </div>
    </div>
  )
}

export default TasksSummary
