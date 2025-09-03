type TaskStatus = 'complete' | 'in_progress' | 'not_started'
type TaskTime = 'morning' | 'afternoon' | 'evening'

export interface Task {
  id: number
  title: string
  description: string
  time: TaskTime
  status: TaskStatus
}
