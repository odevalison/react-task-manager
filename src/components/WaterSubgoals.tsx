import { useGetWaterSubgoals } from '../hooks/data/use-get-water-subgoals'
import WaterSubgoal from './WaterSubgoal'

const WaterSubgoals = () => {
  const { data: subgoals } = useGetWaterSubgoals()

  return (
    <div className="space-y-3">
      {subgoals?.map((subgoal) => (
        <WaterSubgoal
          key={subgoal.id}
          status={subgoal.status}
          subgoal={subgoal}
        />
      ))}
    </div>
  )
}

export default WaterSubgoals
