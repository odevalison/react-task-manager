import { createContext, useEffect, useState } from 'react'

import { useGetWaterConsumption } from '../hooks/data/use-get-water-consumption'

interface WaterConsumptionProviderProps {
  children: React.ReactNode
}

interface WaterConsumptionContextData {
  totalConsumedInMl: number
  goalConsumptionInMl: number
  waterConsumedPercent: number
  increaseTotalConsumedInMl: (amountInMl: number) => void
  decreaseTotalConsumedInMl: (amountInMl: number) => void
}

const WaterConsumptionContext = createContext<WaterConsumptionContextData>(
  {} as WaterConsumptionContextData
)

const WaterConsumptionProvider = ({
  children,
}: WaterConsumptionProviderProps) => {
  const [totalConsumedInMl, setTotalConsumedInMl] = useState<number>(0)
  const [goalConsumptionInMl, setGoalConsumptionInMl] = useState<number>(0)
  const [waterConsumedPercent, setWaterConsumedPercent] = useState<number>(0)

  const { data: waterConsumption } = useGetWaterConsumption()

  useEffect(() => {
    if (waterConsumption) {
      setTotalConsumedInMl(waterConsumption.totalConsumedInMl)
      setGoalConsumptionInMl(waterConsumption.goalConsumptionInMl)
    }
  }, [waterConsumption])

  useEffect(() => {
    if (waterConsumption) {
      setWaterConsumedPercent(
        (totalConsumedInMl / goalConsumptionInMl) * 100 || 0
      )
    }
  }, [totalConsumedInMl, goalConsumptionInMl, waterConsumption])

  const increaseTotalConsumedInMl = (amountInMl: number) => {
    setTotalConsumedInMl(amountInMl)
  }

  const decreaseTotalConsumedInMl = (amountInMl: number) => {
    setTotalConsumedInMl((total) => (total > 0 ? total - amountInMl : total))
  }

  return (
    <WaterConsumptionContext.Provider
      value={{
        totalConsumedInMl,
        goalConsumptionInMl,
        waterConsumedPercent,
        increaseTotalConsumedInMl,
        decreaseTotalConsumedInMl,
      }}
    >
      {children}
    </WaterConsumptionContext.Provider>
  )
}

export { WaterConsumptionContext, WaterConsumptionProvider }
