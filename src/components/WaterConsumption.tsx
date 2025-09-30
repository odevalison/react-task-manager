import { useContext } from 'react'

import { WaterConsumptionContext } from '../context/water-consumption'
import { formatAmount } from '../utils/format-amount'

const WaterConsumption = () => {
  const { totalConsumedInMl, goalConsumptionInMl } = useContext(
    WaterConsumptionContext
  )

  return (
    <div className="self-end">
      <p className="text-xl font-semibold text-brand-primary">
        {formatAmount(totalConsumedInMl)}
        <span className="text-xs font-normal text-brand-dark-blue">
          /{goalConsumptionInMl / 1000}L
        </span>
      </p>
    </div>
  )
}

export default WaterConsumption
