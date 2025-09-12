import { LabelHTMLAttributes } from 'react'

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export default function InputLabel({ children, ...props }: InputLabelProps) {
  return (
    <label {...props} className="text-sm font-semibold text-brand-dark-blue">
      {children}
    </label>
  )
}
