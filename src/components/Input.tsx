import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 text-left">
      <label
        htmlFor={props.id}
        className="text-sm font-semibold text-[#35383E]"
      >
        {label}
      </label>
      <input
        {...props}
        type="text"
        className="rounded-lg border border-[#ECECEC] px-4 py-3 text-sm outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
      />
    </div>
  )
}
