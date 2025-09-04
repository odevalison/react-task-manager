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
    switch (variant) {
      case 'primary':
        return 'bg-[#00ADB5] text-white'
      case 'ghost':
        return 'bg-transparent text-[#818181]'
      case 'secondary':
        return 'bg-[#EEEEEE] text-[#35383E]'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-1 text-xs'
      case 'lg':
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
