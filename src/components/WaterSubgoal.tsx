import { useContext } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { WaterConsumptionContext } from '../context/water-consumption'
import { useCompleteWaterSubgoal } from '../hooks/data/use-complete-water-subgoal'
import { useGetWaterSubgoals } from '../hooks/data/use-get-water-subgoals'
import { useUndoWaterSubgoal } from '../hooks/data/use-undo-water-subgoal'
import { useUpdateWaterSubgoalStatus } from '../hooks/data/use-update-water-subgoal-status'
import type { Subgoal } from '../types/water-subgoal'
import { formatAmount } from '../utils/format-amount'
import Checkbox from './Checkbox'

const waterSubgoal = tv({
  base: 'flex items-center justify-between rounded-lg bg-opacity-10 px-4 py-3 transition',
  variants: {
    status: {
      pending:
        'bg-brand-dark-blue bg-opacity-5 text-sm font-medium text-brand-dark-gray',
      completed: 'bg-brand-primary text-sm font-medium text-brand-primary',
    },
  },
  defaultVariants: { status: 'pending' },
})

type WaterSubgoalVariants = VariantProps<typeof waterSubgoal>

interface WaterSubgoalProps extends WaterSubgoalVariants {
  subgoal: Subgoal
}

const WaterSubgoal = ({ subgoal, status }: WaterSubgoalProps) => {
  const {
    increaseTotalConsumedInMl,
    decreaseTotalConsumedInMl,
    goalConsumptionInMl,
    totalConsumedInMl,
  } = useContext(WaterConsumptionContext)

  const { data: allSubgoals } = useGetWaterSubgoals()

  const { mutate: updateWaterSubgoalStatus } = useUpdateWaterSubgoalStatus({
    subgoalId: subgoal.id,
  })

  const { mutate: completeWaterSubgoal } = useCompleteWaterSubgoal({
    totalConsumedInMl,
    goalConsumptionInMl,
    subgoalId: subgoal.id,
    subgoalStatus: subgoal.status,
  })

  const { mutate: undoWaterSubgoal } = useUndoWaterSubgoal({
    subgoalId: subgoal.id,
    subgoalStatus: subgoal.status,
    subgoalAmountInMl: subgoal.amountInMl,
    currentSubgoals: allSubgoals as Subgoal[],
    currentTotalConsumedInMl: totalConsumedInMl,
  })

  const handleCompleteSubgoal = () => {
    if (status === 'completed') {
      undoWaterSubgoal({
        onSuccess: ({ amountToDecrease, subgoalStatus }) => {
          updateWaterSubgoalStatus({ currentStatus: subgoalStatus })
          decreaseTotalConsumedInMl(amountToDecrease)
        },
      })
    }

    if (status === 'pending') {
      completeWaterSubgoal({
        amountInMl: subgoal.amountInMl,
        onSuccess: ({ subgoalStatus, waterConsumption }) => {
          updateWaterSubgoalStatus({ currentStatus: subgoalStatus })
          increaseTotalConsumedInMl(waterConsumption.totalConsumedInMl)
        },
      })
    }
  }

  return (
    <div className={waterSubgoal({ status })}>
      <div className="flex items-center gap-3">
        <Checkbox onChange={() => handleCompleteSubgoal()} status={status} />
        {formatAmount(subgoal.amountInMl)}
      </div>
    </div>
  )
}

export default WaterSubgoal
