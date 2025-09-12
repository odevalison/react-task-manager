import { forwardRef, InputHTMLAttributes } from 'react'

import InputError from './InputError'
import InputLabel from './InputLabel'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = '', id, ...props }, ref) => (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <input
        {...props}
        ref={ref}
        type="text"
        className="rounded-lg border border-[#ECECEC] px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
      />
      {error && <InputError>{error}</InputError>}
    </div>
  )
)

export default Input
