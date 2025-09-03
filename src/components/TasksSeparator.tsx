interface TasksSeparatorProps {
  text: string
  icon: React.ReactNode
}

export default function TasksSeparator({ icon, text }: TasksSeparatorProps) {
  return (
    <div className="mb-3 flex items-center gap-1.5 border-b border-[#F4F4F5] pb-1.5 text-[#9A9C9F]">
      {icon}
      <p className="text-sm font-semibold">{text}</p>
    </div>
  )
}
