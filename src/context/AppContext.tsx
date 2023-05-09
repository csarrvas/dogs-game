/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useEffect, useReducer, useState } from 'react'
import { getBreeds } from '../api'
import { AppState, AppAction, AppActionKind, AppContextType } from '../types';
import useRandomOptions from '../hooks/useRandomOptions';

const POINTS_PER_GUESS = 2
const INITIAL_SCORE = 10

const initialState: AppState = {
  currentBreed: '',
  guessed: [],
  score: INITIAL_SCORE,
}

const defaultContext = {
  ...initialState,
  breeds: [],
  randomItems: [],
  decreaseScore: () => {},
  increaseScore: () => {},
  start: () => {},
  reset: () => {},
}

const appReducer = (state: AppState, action: AppAction) => {
  const prevState: AppState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case AppActionKind.INCREASE:
      return {
        ...prevState,
        currentBreed: String(action.payload?.nextBreed),
        guessed: [...prevState.guessed, prevState.currentBreed],
        score: prevState.score + POINTS_PER_GUESS
      }
    case AppActionKind.DECREASE:
      return {
        ...prevState,
        score: prevState.score - POINTS_PER_GUESS
      }
    case AppActionKind.SELECT_RANDOM:
      return {
        ...prevState,
        currentBreed: String(action.payload?.nextBreed)
      }
    case AppActionKind.RESET:
      return {
        ...initialState,
      }
    default:
      return prevState;
  }
};

type AppContextProps = {
  children: ReactElement
}

export const AppContext = createContext<AppContextType>(defaultContext)

const Context = ({ children }: AppContextProps) => {
  const [breeds, setBreeds] = useState<string[]>([])
  const [{ currentBreed, guessed, score }, dispatch] = useReducer(appReducer, initialState)
  const { randomItems, setNewRandomList } = useRandomOptions()

  const getNextRandom = () => {
    const elements = [...guessed, currentBreed]
    const rest = breeds.filter(item => !elements.some(element => element === item))
    const newElement = rest[Math.floor(Math.random() * rest.length)]
    return newElement
  }

  const increaseScore = () => {
    const nextBreed = getNextRandom()
    dispatch({ type: AppActionKind.INCREASE, payload: { nextBreed } })
  }

  const decreaseScore = () => {
    dispatch({ type: AppActionKind.DECREASE })
  }

  const start = () => {
    const nextBreed = getNextRandom()
    dispatch({ type: AppActionKind.SELECT_RANDOM, payload: { nextBreed } })
    setNewRandomList({ list: breeds, current: nextBreed })
  }

  const reset = () => {
    dispatch({ type: AppActionKind.RESET })
  }

  useEffect(() => {
    const fetchAllBreeds = async () => {
      const { message } = await getBreeds()
      const breeds = Object.keys(message)
      setBreeds(breeds.slice(0, 6))
    }
    fetchAllBreeds()
  }, [])

  const value = {
    breeds,
    currentBreed,
    guessed,
    randomItems,
    score,
    decreaseScore,
    increaseScore,
    start,
    reset,
  }


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default Context