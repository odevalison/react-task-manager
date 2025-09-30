import { Subgoal } from '../../types/water-subgoal'
import { getNewTotalConsumedInMl } from './get-new-total-consumed-in-ml'

export const getAmountToDecrease = (
  allSubgoals: Subgoal[],
  subgoalAmountInMl: number,
  currentTotalConsumedInMl: number
) => {
  const newTotalConsumed = getNewTotalConsumedInMl(
    allSubgoals,
    subgoalAmountInMl,
    currentTotalConsumedInMl
  )
  return currentTotalConsumedInMl - newTotalConsumed
}
