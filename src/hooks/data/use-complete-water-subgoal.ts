import { useMutation, useQueryClient } from '@tanstack/react-query'

import { waterSubgoalMutationKeys } from '../../keys/mutations'
import {
  waterConsumptionQueryKeys,
  waterSubgoalQueryKeys,
} from '../../keys/queries'
import { api } from '../../lib/axios'
import { WaterConsumption } from '../../types/water-consumption'
import { SubgoalStatus } from '../../types/water-subgoal'

interface UseCompleteWaterSubgoalProps {
  subgoalId: string
  goalConsumptionInMl: number
  totalConsumedInMl: number
  subgoalStatus: SubgoalStatus
}

interface CompleteWaterSubgoalMutationProps {
  amountInMl: number
  onSuccess: (data: OnCompleteWaterSubgoalSuccessData) => void
}

interface OnCompleteWaterSubgoalSuccessData {
  subgoalStatus: SubgoalStatus
  waterConsumption: WaterConsumption
}

export const useCompleteWaterSubgoal = ({
  subgoalId,
  subgoalStatus,
  totalConsumedInMl,
  goalConsumptionInMl,
}: UseCompleteWaterSubgoalProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: waterSubgoalMutationKeys.complete(subgoalId),
    mutationFn: async ({
      amountInMl,
      onSuccess,
    }: CompleteWaterSubgoalMutationProps) => {
      if (!amountInMl || amountInMl <= 0 || isNaN(amountInMl)) {
        throw new Error('Quantidade inválida')
      }

      const { data: newWaterConsumptionData } =
        await api.patch<WaterConsumption>('/water-consumption/1', {
          totalConsumedInMl: Math.min(
            Math.max(totalConsumedInMl, amountInMl),
            goalConsumptionInMl
          ),
        })

      onSuccess({
        subgoalStatus,
        waterConsumption: newWaterConsumptionData,
      })

      return newWaterConsumptionData
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
