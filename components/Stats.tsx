type Props = {
  correct: number
  total: number
  currentStreak: number
  bestStreak: number
}

export default function Stats({ correct, total, currentStreak, bestStreak }: Props) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  return (
    <div className="flex flex-wrap gap-4 items-center text-sm text-neutral-300">
      <div>
        Accuracy: <span className="text-neutral-100">{correct}/{total}</span> ({pct}%)
      </div>
      <div>
        Streak: <span className="text-neutral-100">{currentStreak}</span>
      </div>
      <div>
        Best: <span className="text-neutral-100">{bestStreak}</span>
      </div>
    </div>
  )
}
