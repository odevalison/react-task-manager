import { forwardRef, SelectHTMLAttributes } from 'react'

import InputError from './InputError'
import InputLabel from './InputLabel'

interface TimeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const TimeSelect = forwardRef<HTMLSelectElement, TimeSelectProps>(
  ({ error = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 text-left">
        <InputLabel htmlFor="time">Horário</InputLabel>
        <select
          {...props}
          ref={ref}
          id="time"
          className="rounded-lg border border-brand-border px-4 py-3 text-sm outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        >
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="evening">Noite</option>
        </select>
        {error && <InputError>{error}</InputError>}
      </div>
    )
  }
)

export default TimeSelect
