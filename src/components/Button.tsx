import { ButtonHTMLAttributes } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    color: {
      primary: 'bg-brand-primary text-white',
      ghost: 'bg-transparent text-brand-dark-gray',
      secondary: 'bg-brand-light-gray text-brand-dark-blue',
      danger: 'bg-brand-danger text-brand-white',
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

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  children: React.ReactNode
}

const Button = ({ children, color, size, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={button({ color, size, className: props.className })}
    >
      {children}
    </button>
  )
}

export default Button
