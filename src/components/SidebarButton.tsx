type SidebarButtonVariants = 'default' | 'selected'

interface SidebarButtonProps {
  variant?: SidebarButtonVariants
  children: React.ReactNode
}

export default function SidebarButton({
  children,
  variant = 'default',
}: SidebarButtonProps) {
  const getVariantClasses = () => {
    if (variant === 'default') {
      return 'text-brand-dark-blue'
    } else if (variant === 'selected') {
      return 'bg-brand-primary/15 text-brand-primary'
    }
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
