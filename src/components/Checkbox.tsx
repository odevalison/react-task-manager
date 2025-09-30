import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

import { CheckIcon, LoaderIcon } from '../assets/icons'

const checkbox = tv({
  base: 'relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-brand-white',
  variants: {
    status: {
      not_started: 'bg-brand-dark-blue bg-opacity-5',
      pending: 'bg-brand-dark-blue bg-opacity-5',
      in_progress: 'bg-brand-process',
      complete: 'bg-brand-primary',
      completed: 'bg-brand-primary',
    },
  },
  defaultVariants: { status: 'not_started' },
})

type CheckboxVariants = VariantProps<typeof checkbox>

interface CheckboxProps extends ComponentProps<'input'>, CheckboxVariants {}

const Checkbox = ({ status = 'not_started', ...props }: CheckboxProps) => {
  return (
    <>
      <label className={checkbox({ status })}>
        <input
          {...props}
          type="checkbox"
          checked={status === 'complete' || status === 'completed'}
          className="absolute size-full cursor-pointer opacity-0"
        />
        {(status === 'complete' || status === 'completed') && <CheckIcon />}
        {status === 'in_progress' && <LoaderIcon className="animate-spin" />}
      </label>
    </>
  )
}

export default Checkbox
