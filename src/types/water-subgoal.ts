export type SubgoalStatus = 'pending' | 'completed'

export type Subgoal = {
  id: string
  amountInMl: number
  status: SubgoalStatus
}
