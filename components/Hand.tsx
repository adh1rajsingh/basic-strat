import { Card as TCard, handValue } from '@/lib/blackjack'
import Card from './Card'

type Props = {
  title: string
  cards: TCard[]
  hideHole?: boolean
}

export default function Hand({ title, cards, hideHole = false }: Props) {
  const hv = handValue(cards)
  return (
    <div>
      <div className="text-sm text-neutral-300 mb-2 uppercase tracking-wide">{title}</div>
      <div className="flex items-center gap-2">
        {cards.map((c, i) => (
          <Card key={i} card={c} hidden={hideHole && i === 1} />
        ))}
        <div className="ml-3 text-neutral-200 text-sm">Total: {hv.total}{hv.soft ? ' (soft)' : ''}</div>
      </div>
    </div>
  )
}
