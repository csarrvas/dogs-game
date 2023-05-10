export enum AppActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  NEW_GAME = 'NEW_GAME'
}

export type AppState = {
  currentBreed: string
  guessed: string[]
  score: number
}

export type AppAction = {
  type: AppActionKind
  payload?: {
    nextBreed: string
  }
}

export type AppContextType = AppState & {
  breeds: string[]
  imageUrl: string
  finished: boolean
  isCheatMode: boolean
  randomItems: string[]
  decreaseScore: () => void,
  increaseScore: () => void,
  newGame: () => void,
  switchMode: () => void,
}
