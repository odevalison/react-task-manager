import { ButtonHTMLAttributes } from 'react'

type ButtonVariants = 'ghost' | 'primary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariants
}

export default function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#00ADB5] text-white'
      case 'ghost':
        return 'bg-transparent text-[#818181]'
    }
  }

  return (
    <button
      {...props}
      className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-85 ${getVariantClasses()}`}
    >
      {children}
    </button>
  )
}
