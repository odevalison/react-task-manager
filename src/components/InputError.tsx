interface InputErrorProps {
  children: React.ReactNode
}

const InputError = ({ children }: InputErrorProps) => {
  return <p className="text-left text-xs text-red-500">{children}</p>
}

export default InputError
