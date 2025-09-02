type SidebarButtonVariants = 'default' | 'selected'

interface SidebarButtonProps {
  variant: SidebarButtonVariants
  children: React.ReactNode
}

export default function SidebarButton({
  children,
  variant,
}: SidebarButtonProps) {
  const getVariantClasses = () => {
    return variant === 'default'
      ? 'text-[#35383E]'
      : 'bg-[#E6F7F8] text-[#00ADB5]'
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}
