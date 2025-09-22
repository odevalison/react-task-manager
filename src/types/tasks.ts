export type TaskStatus = 'complete' | 'in_progress' | 'not_started'

export enum TaskTime {
  morning = 'Manhã',
  afternoon = 'Tarde',
  evening = 'Noite',
}

export type Task = {
  id: string
  title: string
  description: string
  time: keyof typeof TaskTime
  status: TaskStatus
}
