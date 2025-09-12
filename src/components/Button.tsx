import { ButtonHTMLAttributes } from 'react'

type ButtonVariants = 'ghost' | 'primary' | 'secondary'
type ButtonSizes = 'sm' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariants
  size?: ButtonSizes
}

export default function Button({
  children,
  variant = 'primary',
  size = 'sm',
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-brand-primary text-white'
    } else if (variant === 'ghost') {
      return 'bg-transparent text-brand-dark-gray'
    } else if (variant === 'secondary') {
      return 'bg-brand-light-gray text-brand-dark-blue'
    }
  }

  const getSizeClasses = () => {
    if (size === 'sm') {
      return 'py-1 text-xs'
    } else if (size === 'lg') {
      return 'text-sm py-2'
    }
  }

  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-1 rounded-md px-3 font-semibold transition hover:opacity-85 ${getVariantClasses()} ${getSizeClasses()}`}
    >
      {children}
    </button>
  )
}
