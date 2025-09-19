export default function StrategyChart() {
  return (
    <div className="mt-4 p-4 rounded-md border border-neutral-800 bg-neutral-900 text-sm leading-6">
      <div className="font-semibold mb-2">Basic Strategy (S17, DAS - Simplified)</div>
      <ul className="list-disc pl-5 space-y-1 text-neutral-300">
        <li>Pairs: Split A,A and 8,8. Never split 10s.</li>
        <li>9,9: Split vs 2–6,8,9; stand vs 7,10,A.</li>
        <li>7,7: Split vs 2–7; else hit.</li>
        <li>6,6: Split vs 2–6; else hit.</li>
        <li>5,5: Treat as hard 10: double vs 2–9 else hit.</li>
        <li>4,4: Split vs 5–6; else hit.</li>
        <li>2,2 and 3,3: Split vs 2–7; else hit.</li>
        <li>Soft A,9: Stand. A,8: Double vs 6 else stand.</li>
        <li>Soft A,7: Double vs 3–6; stand vs 2,7,8; else hit.</li>
        <li>Soft A,6: Double vs 3–6 else hit. A,4/A,5: Double vs 4–6 else hit.</li>
        <li>Soft A,2/A,3: Double vs 5–6 else hit.</li>
        <li>Hard 17+: Stand. 13–16: Stand vs 2–6 else hit. 12: Stand vs 4–6 else hit.</li>
        <li>Hard 11: Double; 10: Double vs 2–9 else hit; 9: Double vs 3–6 else hit.</li>
        <li>Else: Hit.</li>
      </ul>
    </div>
  )
}
