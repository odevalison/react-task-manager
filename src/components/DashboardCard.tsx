interface DashboardCardProps {
  icon: React.ReactNode
  mainText: string | number
  secondaryText: string
}

const DashboardCard = ({
  icon,
  mainText,
  secondaryText,
}: DashboardCardProps) => {
  return (
    <div className="bg-brand-whte flex h-[150px] min-w-[250px] flex-col items-center justify-center gap-1 rounded-[10px] bg-brand-white px-[30px] py-10">
      <div className="flex items-center gap-2">
        <div className="text-brand-primary *:size-6">{icon}</div>
        <p className="text-dark-blue text-2xl font-semibold">{mainText}</p>
      </div>
      <div>{secondaryText}</div>
    </div>
  )
}

export default DashboardCard
