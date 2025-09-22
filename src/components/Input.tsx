import { forwardRef, InputHTMLAttributes } from 'react'

import InputError from './InputError'
import InputLabel from './InputLabel'

type InputProps = {
  label: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = '', id, ...props }, ref) => (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <input
        {...props}
        ref={ref}
        type="text"
        className="rounded-lg border border-brand-border px-4 py-3 text-sm outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
      />
      {error && <InputError>{error}</InputError>}
    </div>
  )
)

export default Input
