export type Suit = '♥' | '♦' | '♣' | '♠'
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'

export interface Card {
  suit: Suit
  rank: Rank
}

export interface GameState {
  deck: Card[]
  playerHand: Card[]
  dealerHand: Card[]
  canDouble: boolean
  canSplit: boolean
  feedback?: { correct: boolean; message: string } | null
  correctCount: number
  totalCount: number
  currentStreak: number
  bestStreak: number
}

export type Action = 'Hit' | 'Stand' | 'Double' | 'Split'

const suits: Suit[] = ['♥', '♦', '♣', '♠']
const ranks: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank })
    }
  }
  // shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

export function valueOfCard(rank: Rank): number {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return parseInt(rank, 10)
}

export function handValue(cards: Card[]): { total: number; soft: boolean } {
  let total = 0
  let aces = 0
  for (const c of cards) {
    total += valueOfCard(c.rank)
    if (c.rank === 'A') aces++
  }
  // Convert Aces from 11 to 1 as needed
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  const soft = aces > 0
  return { total, soft }
}

export function isPair(cards: Card[]): boolean {
  return cards.length === 2 && cards[0].rank === cards[1].rank
}

export function deal(deck: Card[], count: number): { drawn: Card[]; rest: Card[] } {
  const drawn = deck.slice(0, count)
  const rest = deck.slice(count)
  return { drawn, rest }
}

export function newHand(prev?: Partial<GameState>): GameState {
  let deck = createDeck()
  const p1 = deal(deck, 2)
  deck = p1.rest
  const d1 = deal(deck, 2)
  deck = d1.rest
  const canSplit = isPair(p1.drawn)
  return {
    deck,
    playerHand: p1.drawn,
    dealerHand: d1.drawn,
    canDouble: true,
    canSplit,
    feedback: null,
    correctCount: prev?.correctCount ?? 0,
    totalCount: prev?.totalCount ?? 0,
    currentStreak: prev?.currentStreak ?? 0,
    bestStreak: prev?.bestStreak ?? 0,
  }
}

function dealerUpRank(dealerHand: Card[]): Rank {
  return dealerHand[0].rank
}

function rankToValueForDealerUp(rank: Rank): number {
  if (rank === 'A') return 11
  if (rank === 'K' || rank === 'Q' || rank === 'J') return 10
  return parseInt(rank, 10)
}

// Basic Strategy for 4-8 decks, dealer stands on soft 17, doubling after split allowed. Simplified common chart.
// Return the best action for player's initial two-card hand vs dealer up-card.
export function basicStrategyDecision(player: Card[], dealer: Card[]): Action {
  const up = rankToValueForDealerUp(dealerUpRank(dealer))

  // Pairs
  if (player.length === 2 && isPair(player)) {
    const r = player[0].rank
    switch (r) {
      case 'A':
      case '8':
        return 'Split'
      case '10':
      case 'J':
      case 'Q':
      case 'K':
        return 'Stand'
      case '9':
        return up === 7 || up === 10 || up === 11 ? 'Stand' : 'Split'
      case '7':
        return up <= 7 ? 'Split' : 'Hit'
      case '6':
        return up <= 6 ? 'Split' : 'Hit'
      case '5':
        // Treat as hard 10: double vs 2-9 else hit
        return up >= 2 && up <= 9 ? 'Double' : 'Hit'
      case '4':
        return up === 5 || up === 6 ? 'Split' : 'Hit'
      case '3':
      case '2':
        return up <= 7 ? 'Split' : 'Hit'
    }
  }

  // Soft totals (hands with an Ace counted as 11)
  const { total, soft } = handValue(player)
  if (player.length === 2 && soft && (player[0].rank === 'A' || player[1].rank === 'A')) {
    const other = player[0].rank === 'A' ? player[1].rank : player[0].rank
    const otherVal = valueOfCard(other as Rank)
    switch (otherVal) {
      case 9: // A,9 (20)
        return 'Stand'
      case 8: // A,8 (19)
        return up === 6 ? 'Double' : 'Stand'
      case 7: // A,7 (18)
        if (up >= 3 && up <= 6) return 'Double'
        if (up === 2 || up === 7 || up === 8) return 'Stand'
        return 'Hit'
      case 6: // A,6 (17)
        return up >= 3 && up <= 6 ? 'Double' : 'Hit'
      case 5: // A,5 (16)
      case 4: // A,4 (15)
        return up >= 4 && up <= 6 ? 'Double' : 'Hit'
      case 3: // A,3 (14)
      case 2: // A,2 (13)
        return up >= 5 && up <= 6 ? 'Double' : 'Hit'
    }
  }

  // Hard totals
  if (total >= 17) return 'Stand'
  if (total >= 13 && total <= 16) return up <= 6 ? 'Stand' : 'Hit'
  if (total === 12) return up >= 4 && up <= 6 ? 'Stand' : 'Hit'
  if (total === 11) return 'Double'
  if (total === 10) return up <= 9 ? 'Double' : 'Hit'
  if (total === 9) return up >= 3 && up <= 6 ? 'Double' : 'Hit'
  return 'Hit'
}

export function applyAction(state: GameState, action: Action): GameState {
  let deck = state.deck
  let player = [...state.playerHand]
  const dealer = [...state.dealerHand]
  const correct = basicStrategyDecision(player, dealer)

  // feedback only; we do not play out the hand. This is a trainer.
  const isCorrect = action === correct
  const feedback = {
    correct: isCorrect,
    message: isCorrect
      ? '✅ Correct!'
      : `❌ Incorrect. The correct move was ${correct}.`,
  }

  if (action === 'Hit') {
    const d = deal(deck, 1)
    deck = d.rest
    player.push(...d.drawn)
  }

  let correctCount = state.correctCount
  let totalCount = state.totalCount
  let currentStreak = state.currentStreak
  let bestStreak = state.bestStreak

  if (!state.feedback) {
    totalCount += 1
    if (isCorrect) {
      correctCount += 1
      currentStreak += 1
      if (currentStreak > bestStreak) bestStreak = currentStreak
    } else {
      currentStreak = 0
    }
  }

  return {
    ...state,
    deck,
    playerHand: player,
    canDouble: false,
    canSplit: false,
    feedback,
    correctCount,
    totalCount,
    currentStreak,
    bestStreak,
  }
}
