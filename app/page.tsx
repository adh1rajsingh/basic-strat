'use client'

import { useEffect, useReducer, useState } from 'react'
import Controls from '@/components/Controls'
import Hand from '@/components/Hand'
import Feedback from '@/components/Feedback'
import Stats from '@/components/Stats'
import StrategyChart from '@/components/StrategyChart'
import { GameState, newHand, applyAction, Action } from '@/lib/blackjack'

type State = GameState

type Msg =
  | { type: 'INIT' }
  | { type: 'NEW' }
  | { type: 'ACTION'; action: Action }

function reducer(state: State, msg: Msg): State {
  switch (msg.type) {
    case 'INIT':
    case 'NEW':
      return newHand(state ?? undefined)
    case 'ACTION':
      return applyAction(state, msg.action)
    default:
      return state
  }
}

export default function Page() {
  const [state, dispatch] = useReducer(reducer, null as any)
  const [showChart, setShowChart] = useState(false)
  useEffect(() => {
    dispatch({ type: 'INIT' })
  }, [])

  if (!state) return null

  const dealerUp = state.dealerHand[0]

  return (
    <main className="min-h-screen p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Blackjack Basic Strategy Trainer</h1>
        <div className="rounded-xl p-6 md:p-8 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800">
          <div className="grid gap-6">
            <Hand title="Dealer" cards={[dealerUp, state.dealerHand[1]]} hideHole={true} />
            <Hand title="Player" cards={state.playerHand} />
          </div>
          <div className="mt-6">
            <Controls
              onAction={(a) => dispatch({ type: 'ACTION', action: a })}
              onNewHand={() => dispatch({ type: 'NEW' })}
              canDouble={state.canDouble}
              canSplit={state.canSplit}
              disabled={!!state.feedback}
            />
            <Feedback message={state.feedback?.message ?? null} />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <Stats
              correct={state.correctCount}
              total={state.totalCount}
              currentStreak={state.currentStreak}
              bestStreak={state.bestStreak}
            />
            <button
              className="px-3 py-2 text-sm rounded-md bg-neutral-800 hover:bg-neutral-700"
              onClick={() => setShowChart((s) => !s)}
            >
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </button>
          </div>
          {showChart && <StrategyChart />}
          <div className="mt-3 text-xs text-neutral-500">
            Note: Trainer checks your choice against a standard multi-deck chart (S17, DAS). Split and Double are only enabled on initial two-card hands, with Split requiring a pair.
          </div>
        </div>
      </div>
    </main>
  )
}
