import { useMutation, useQueryClient } from '@tanstack/react-query'

import { waterSubgoalMutationKeys } from '../../keys/mutations'
import { waterSubgoalQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import type { Subgoal, SubgoalStatus } from '../../types/water-subgoal'
import { getNewStatus } from '../../utils/subgoal/get-new-status'

interface UseUpdateWaterSubgoalStatusProps {
  subgoalId: string
}

interface UpdateWaterSubgoalStatusMutationProps {
  currentStatus: SubgoalStatus
}

export const useUpdateWaterSubgoalStatus = ({
  subgoalId,
}: UseUpdateWaterSubgoalStatusProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: waterSubgoalMutationKeys.updateStatus(subgoalId),
    mutationFn: async ({
      currentStatus,
    }: UpdateWaterSubgoalStatusMutationProps) => {
      const { data: updatedSubgoal } = await api.patch<Subgoal>(
        `/water-subgoals/${subgoalId}`,
        { status: getNewStatus(currentStatus) }
      )

      return updatedSubgoal
    },
    onSuccess: (updatedSubgoal) => {
      queryClient.setQueryData<Subgoal[]>(
        waterSubgoalQueryKeys.getAll(),
        (subgoals) => {
          return subgoals?.map((subgoal) =>
            subgoal.id === updatedSubgoal.id ? updatedSubgoal : subgoal
          )
        }
      )
    },
  })
}
