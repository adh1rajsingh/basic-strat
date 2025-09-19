"use client"

import { useState } from 'react'

type Action = 'H' | 'S' | 'D' | 'P'

const dealerCols = ['2','3','4','5','6','7','8','9','10','A'] as const

const cellClass: Record<Action, string> = {
  H: 'bg-red-600 text-white',
  S: 'bg-sky-600 text-white',
  D: 'bg-amber-400 text-neutral-900',
  P: 'bg-lime-400 text-neutral-900',
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-neutral-300">
      {([
        ['H','Hit'],
        ['S','Stand'],
        ['D','Double'],
        ['P','Split'],
      ] as [Action,string][]).map(([k, label]) => (
        <div key={k} className="flex items-center gap-1">
          <div className={`w-5 h-5 rounded-sm grid place-items-center font-semibold ${cellClass[k]}`}>{k}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function Grid({ title, rows }: { title: string; rows: Array<{ label: string; actions: Action[] }> }) {
  return (
    <div>
      <div className="font-semibold mb-2">{title}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-left text-neutral-400 font-medium py-2 pr-2">Player</th>
              {dealerCols.map((c) => (
                <th key={c} className="px-1 py-2 text-neutral-400 font-medium">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="">
                <td className="py-1 pr-2 text-neutral-200 whitespace-nowrap">{r.label}</td>
                {r.actions.map((a, i) => (
                  <td key={i} className="p-1">
                    <div className={`w-6 h-6 rounded-sm grid place-items-center font-semibold ${cellClass[a]}`}>{a}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function StrategyChart() {
  const [tab, setTab] = useState<'Pairs' | 'Soft' | 'Hard'>('Hard')

  const pairs: Array<{ label: string; actions: Action[] }> = [
    { label: 'A,A', actions: ['P','P','P','P','P','P','P','P','P','P'] },
    { label: '10,10', actions: ['S','S','S','S','S','S','S','S','S','S'] },
    { label: '9,9', actions: ['P','P','P','P','P','S','P','P','S','S'] },
    { label: '8,8', actions: ['P','P','P','P','P','P','P','P','P','P'] },
    { label: '7,7', actions: ['P','P','P','P','P','P','H','H','H','H'] },
    { label: '6,6', actions: ['P','P','P','P','P','H','H','H','H','H'] },
    { label: '5,5', actions: ['D','D','D','D','D','D','D','D','H','H'] },
    { label: '4,4', actions: ['H','H','H','P','P','H','H','H','H','H'] },
    { label: '3,3', actions: ['P','P','P','P','P','P','H','H','H','H'] },
    { label: '2,2', actions: ['P','P','P','P','P','P','H','H','H','H'] },
  ]

  const soft: Array<{ label: string; actions: Action[] }> = [
    { label: 'A,9 (20)', actions: ['S','S','S','S','S','S','S','S','S','S'] },
    { label: 'A,8 (19)', actions: ['S','S','S','S','D','S','S','S','S','S'] },
    { label: 'A,7 (18)', actions: ['S','D','D','D','D','S','S','H','H','H'] },
    { label: 'A,6 (17)', actions: ['H','D','D','D','D','H','H','H','H','H'] },
    { label: 'A,5 (16)', actions: ['H','H','D','D','D','H','H','H','H','H'] },
    { label: 'A,4 (15)', actions: ['H','H','D','D','D','H','H','H','H','H'] },
    { label: 'A,3 (14)', actions: ['H','H','H','D','D','H','H','H','H','H'] },
    { label: 'A,2 (13)', actions: ['H','H','H','D','D','H','H','H','H','H'] },
  ]

  const hard: Array<{ label: string; actions: Action[] }> = [
    { label: '17+ ', actions: ['S','S','S','S','S','S','S','S','S','S'] },
    { label: '16', actions: ['S','S','S','S','S','H','H','H','H','H'] },
    { label: '15', actions: ['S','S','S','S','S','H','H','H','H','H'] },
    { label: '14', actions: ['S','S','S','S','S','H','H','H','H','H'] },
    { label: '13', actions: ['S','S','S','S','S','H','H','H','H','H'] },
    { label: '12', actions: ['H','H','S','S','S','H','H','H','H','H'] },
    { label: '11', actions: ['D','D','D','D','D','D','D','D','D','D'] },
    { label: '10', actions: ['D','D','D','D','D','D','D','D','H','H'] },
    { label: '9', actions: ['H','D','D','D','D','H','H','H','H','H'] },
    { label: '8 or less', actions: ['H','H','H','H','H','H','H','H','H','H'] },
  ]

  return (
    <div className="mt-4 p-4 rounded-md border border-neutral-800 bg-neutral-900 text-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="font-semibold">Basic Strategy (S17, DAS)</div>
        <div className="flex gap-1">
          {(['Hard','Soft','Pairs'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs border ${tab===t ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3"><Legend /></div>
      {tab === 'Pairs' && <Grid title="Pairs vs Dealer Up-card" rows={pairs} />}
      {tab === 'Soft' && <Grid title="Soft Totals vs Dealer Up-card" rows={soft} />}
      {tab === 'Hard' && <Grid title="Hard Totals vs Dealer Up-card" rows={hard} />}
      <div className="mt-3 text-[11px] text-neutral-500">Columns show Dealer up-card (2–10, A). Cells indicate optimal action.</div>
    </div>
  )
}
