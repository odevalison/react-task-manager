import { useQuery } from '@tanstack/react-query'

import { waterSubgoalQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import { Subgoal } from '../../types/water-subgoal'

export const useGetWaterSubgoals = () => {
  return useQuery({
    queryKey: waterSubgoalQueryKeys.getAll(),
    queryFn: async () => {
      const { data: subgoals } = await api.get<Subgoal[]>('/water-subgoals')
      return subgoals
    },
  })
}
