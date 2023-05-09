export enum AppActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  SELECT_RANDOM = 'SELECT_RANDOM',
  RESET = 'RESET'
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
  randomItems: string[]
  decreaseScore: (points: number) => void,
  increaseScore: (points: number) => void,
  start: () => void,
  reset: () => void,
}
