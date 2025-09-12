import { SelectHTMLAttributes } from 'react'

import InputError from './InputError'
import InputLabel from './InputLabel'

interface TimeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export default function TimeSelect({ error = '', ...props }: TimeSelectProps) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        {...props}
        id="time"
        className="rounded-lg border border-[#ECECEC] px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {error && <InputError>{error}</InputError>}
    </div>
  )
}
