import { Subgoal } from '../../types/water-subgoal'

export const getNewTotalConsumedInMl = (
  allSubgoals: Subgoal[],
  subgoalAmountInMl: number,
  currentTotalConsumedInMl: number
) => {
  if (currentTotalConsumedInMl > subgoalAmountInMl) {
    return Math.max(currentTotalConsumedInMl, 0)
  }

  const othersCompletedSubgoals = allSubgoals.filter(
    (s) => s.status === 'completed' && s.amountInMl !== subgoalAmountInMl
  )

  if (othersCompletedSubgoals.length === 0) {
    return 0
  }
  if (othersCompletedSubgoals.length >= 1) {
    const maxSubgoalAmount = Math.max(
      ...othersCompletedSubgoals.map((s) => s.amountInMl)
    )
    return Math.max(maxSubgoalAmount, 0)
  }

  const decreasedTotalConsumed = currentTotalConsumedInMl - 500
  return Math.max(decreasedTotalConsumed, 0)
}
