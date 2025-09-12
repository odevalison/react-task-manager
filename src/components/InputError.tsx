export default function InputError({
  children,
}: {
  children: React.ReactNode
}) {
  return <p className="text-left text-xs text-red-500">{children}</p>
}
