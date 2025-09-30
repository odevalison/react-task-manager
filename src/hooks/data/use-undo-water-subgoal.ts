import { useMutation, useQueryClient } from '@tanstack/react-query'

import { waterSubgoalMutationKeys } from '../../keys/mutations'
import {
  waterConsumptionQueryKeys,
  waterSubgoalQueryKeys,
} from '../../keys/queries'
import { api } from '../../lib/axios'
import type { WaterConsumption } from '../../types/water-consumption'
import { Subgoal, SubgoalStatus } from '../../types/water-subgoal'
import { getAmountToDecrease } from '../../utils/water-consumption/get-amount-to-decrease'
import { getNewTotalConsumedInMl } from '../../utils/water-consumption/get-new-total-consumed-in-ml'

interface UseUndoWaterSubgoalProps {
  subgoalId: string
  subgoalAmountInMl: number
  currentSubgoals: Subgoal[]
  subgoalStatus: SubgoalStatus
  currentTotalConsumedInMl: number
}

interface OnUndoWaterSubgoalSuccessData {
  amountToDecrease: number
  subgoalStatus: SubgoalStatus
}

interface UndoSubgoalMutationProps {
  onSuccess: (data: OnUndoWaterSubgoalSuccessData) => void
}

export const useUndoWaterSubgoal = ({
  subgoalId,
  currentSubgoals,
  subgoalStatus,
  subgoalAmountInMl,
  currentTotalConsumedInMl,
}: UseUndoWaterSubgoalProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [waterSubgoalMutationKeys.undo(subgoalId)],
    mutationFn: async ({ onSuccess }: UndoSubgoalMutationProps) => {
      const { data: newlyWaterConsumptionData } =
        await api.patch<WaterConsumption>('/water-consumption/1', {
          totalConsumedInMl: getNewTotalConsumedInMl(
            currentSubgoals,
            subgoalAmountInMl,
            currentTotalConsumedInMl
          ),
        })

      onSuccess({
        subgoalStatus,
        amountToDecrease: getAmountToDecrease(
          currentSubgoals,
          subgoalAmountInMl,
          currentTotalConsumedInMl
        ),
      })

      return newlyWaterConsumptionData
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          waterSubgoalQueryKeys.getAll(),
          waterConsumptionQueryKeys.getAll(),
        ],
      })
    },
  })
}
