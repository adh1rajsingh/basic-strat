type Props = {
  message: string | null
}

export default function Feedback({ message }: Props) {
  if (!message) return null
  return (
    <div className="mt-4 p-3 rounded-md bg-neutral-900 border border-neutral-800 text-sm">
      {message}
    </div>
  )
}
