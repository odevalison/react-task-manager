import { AnchorHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const sidebarButton = tv({
  base: 'flex items-center gap-2 rounded-lg px-6 py-3',
  variants: {
    color: {
      selected: 'bg-brand-primary/15 text-brand-primary',
      unselected: 'text-brand-dark-blue',
    },
  },
  defaultVariants: {
    color: 'unselected',
  },
})

type SidebarButtonVariants = VariantProps<typeof sidebarButton>

interface SidebarButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    SidebarButtonVariants {}

const SidebarButton = ({
  children,
  color,
  href,
  ...props
}: SidebarButtonProps) => {
  return (
    <a
      {...props}
      href={href}
      className={sidebarButton({
        color,
        className: props.className,
      })}
    >
      {children}
    </a>
  )
}

export default SidebarButton
