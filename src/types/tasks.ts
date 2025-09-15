export type TaskStatus = 'complete' | 'in_progress' | 'not_started'
export type TaskTime = 'morning' | 'afternoon' | 'evening'

export interface Task {
  id: string
  title: string
  description: string
  time: TaskTime
  status: TaskStatus
}
