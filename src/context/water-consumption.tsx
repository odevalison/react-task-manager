import { createContext, useEffect, useState } from 'react'

import { useGetWaterConsumption } from '../hooks/data/use-get-water-consumption'

interface WaterConsumptionProviderProps {
  children: React.ReactNode
}

interface WaterConsumptionContextData {
  totalConsumedInMl: number
  goalConsumptionInMl: number
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

  const { data: waterConsumption } = useGetWaterConsumption()

  useEffect(() => {
    if (waterConsumption) {
      setTotalConsumedInMl(waterConsumption.totalConsumedInMl)
      setGoalConsumptionInMl(waterConsumption.goalConsumptionInMl)
    }
  }, [waterConsumption])

  const increaseTotalConsumedInMl = (amountInMl: number) => {
    console.log(amountInMl)
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
        increaseTotalConsumedInMl,
        decreaseTotalConsumedInMl,
      }}
    >
      {children}
    </WaterConsumptionContext.Provider>
  )
}

export { WaterConsumptionContext, WaterConsumptionProvider }
