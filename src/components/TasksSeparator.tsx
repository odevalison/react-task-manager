interface TasksSeparatorProps {
  text: string
  icon: React.ReactNode
}

const TasksSeparator = ({ icon, text }: TasksSeparatorProps) => {
  return (
    <div className="mb-3 flex items-center gap-1.5 border-b border-brand-border pb-1.5 text-brand-text-gray">
      {icon}
      <p className="text-sm font-semibold">{text}</p>
    </div>
  )
}

export default TasksSeparator
