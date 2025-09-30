import { SubgoalStatus } from '../../types/water-subgoal'

export const getNewStatus = (currentStatus: SubgoalStatus) => {
  if (currentStatus === 'completed') {
    return 'pending'
  }
  if (currentStatus === 'pending') {
    return 'completed'
  }
  return currentStatus
}
