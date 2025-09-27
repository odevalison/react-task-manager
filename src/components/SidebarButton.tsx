import { ComponentProps } from 'react'
import { NavLink } from 'react-router-dom'
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
  extends Omit<ComponentProps<'a'>, 'color'>,
    SidebarButtonVariants {}

const SidebarButton = ({
  children,
  href: to,
  ...props
}: SidebarButtonProps) => {
  return (
    <NavLink
      {...props}
      to={to!}
      className={({ isActive }) =>
        sidebarButton({
          color: isActive ? 'selected' : 'unselected',
          className: props.className,
        })
      }
    >
      {children}
    </NavLink>
  )
}

export default SidebarButton
