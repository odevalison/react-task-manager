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

interface SidebarButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: SidebarButtonVariants
}

export default function SidebarButton({
  children,
  variant,
  ...props
}: SidebarButtonProps) {
  return (
    <a
      {...props}
      href="#"
      className={sidebarButton({
        color: variant?.color,
        className: props.className,
      })}
    >
      {children}
    </a>
  )
}
