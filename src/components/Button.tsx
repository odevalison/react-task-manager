import { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    color: {
      primary: 'bg-brand-primary text-white',
      ghost: 'bg-transparent text-brand-dark-gray',
      secondary: 'bg-brand-light-gray text-brand-dark-blue',
    },
    size: {
      small: 'py-1 text-xs',
      large: 'py-2 text-sm',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'small',
  },
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariants
}

export default function Button({ children, variant, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={button({ ...variant, className: props.className })}
    >
      {children}
    </button>
  )
}
