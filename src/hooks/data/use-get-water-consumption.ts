import { useQuery } from '@tanstack/react-query'

import { waterConsumptionQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'
import { WaterConsumption } from '../../types/water-consumption'

export const useGetWaterConsumption = () => {
  return useQuery({
    queryKey: waterConsumptionQueryKeys.getAll(),
    queryFn: async () => {
      const { data: waterConsumption } = await api.get<WaterConsumption>(
        '/water-consumption/1'
      )
      return waterConsumption
    },
  })
}
