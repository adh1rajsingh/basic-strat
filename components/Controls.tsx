type Props = {
  onAction: (action: 'Hit' | 'Stand' | 'Double' | 'Split') => void
  onNewHand: () => void
  canDouble: boolean
  canSplit: boolean
  disabled?: boolean
}

export default function Controls({ onAction, onNewHand, canDouble, canSplit, disabled = false }: Props) {
  const base = 'px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 disabled:bg-neutral-800/50 disabled:text-neutral-500 transition'
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button className={base} onClick={() => onAction('Hit')} disabled={disabled}>Hit</button>
      <button className={base} onClick={() => onAction('Stand')} disabled={disabled}>Stand</button>
      <button className={base} onClick={() => onAction('Double')} disabled={disabled || !canDouble}>Double Down</button>
      <button className={base} onClick={() => onAction('Split')} disabled={disabled || !canSplit}>Split</button>
      <button className="ml-4 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 transition" onClick={onNewHand}>New Hand</button>
    </div>
  )
}
