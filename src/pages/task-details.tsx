import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Task } from '../types/tasks'

const TaskDetailsPage = () => {
  const navigate = useNavigate()
  const { taskId } = useParams()
  const [task, setTask] = useState<Task>({} as Task)

  useEffect(() => {
    const fetchTaskData = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const isNotSuccessResponse = !response.ok
      if (isNotSuccessResponse) {
        return navigate('/')
      }
      setTask(await response.json())
    }
    fetchTaskData()
  }, [taskId, navigate])

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.time}</p>
    </div>
  )
}

export default TaskDetailsPage
