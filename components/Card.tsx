import { Card as TCard } from '@/lib/blackjack'

type Props = {
  card: TCard
  hidden?: boolean
}

export default function Card({ card, hidden = false }: Props) {
  const { rank, suit } = card
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div className="w-16 h-24 bg-white rounded-lg border border-neutral-200 flex items-center justify-center relative card-shadow select-none">
      {hidden ? (
        <div className="absolute inset-0 bg-neutral-800 rounded-lg bg-[radial-gradient(circle_at_30%_20%,#3b82f6_0,#111827_60%)]" />
      ) : (
        <div className={`text-xl font-semibold ${isRed ? 'text-red-600' : 'text-neutral-900'}`}>
          {rank}
          <span className="ml-0.5">{suit}</span>
        </div>
      )}
    </div>
  )
}
