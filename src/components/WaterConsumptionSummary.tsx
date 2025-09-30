import WaterConsumption from './WaterConsumption'
import WaterSubgoals from './WaterSubgoals'

const WaterConsumptionSummary = () => {
  return (
    <div className="space-y-6 rounded-[10px] bg-brand-white p-6">
      <div>
        <h3 className="text-xl font-semibold text-brand-dark-blue">Água</h3>
        <span className="text-sm text-brand-text-gray">
          Beba sua meta diária de água
        </span>
      </div>

      <div className="flex justify-between">
        <WaterSubgoals />
        <WaterConsumption />
      </div>
    </div>
  )
}

export default WaterConsumptionSummary
