/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useEffect, useReducer, useRef, useState } from 'react'
import { getBreeds, getDogImage } from '../api'
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
  imageUrl: '',
  finished: false,
  isCheatMode: false,
  randomItems: [],
  decreaseScore: () => {},
  increaseScore: () => {},
  newGame: () => {},
  switchMode: () => {}
}

const appReducer = (state: AppState, action: AppAction) => {
  const prevState: AppState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case AppActionKind.INCREASE:
      return {
        ...prevState,
        currentBreed: action.payload?.nextBreed || '',
        guessed: [...prevState.guessed, prevState.currentBreed],
        score: prevState.score + POINTS_PER_GUESS
      }
    case AppActionKind.DECREASE:
      return {
        ...prevState,
        score: prevState.score - POINTS_PER_GUESS
      }
    case AppActionKind.NEW_GAME:
      return {
        ...initialState,
        currentBreed: action.payload?.nextBreed || ''
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
  const firstRender = useRef<boolean>(true)
  const [breeds, setBreeds] = useState<string[]>([])
  const [{ currentBreed, guessed, score }, dispatch] = useReducer(appReducer, initialState)
  const { randomItems, setNewRandomList } = useRandomOptions()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isCheatMode, setIsCheatMode] = useState<boolean>(false)

  const getNextRandom = () => {
    const elements = [...guessed, currentBreed]
    const rest = breeds.filter(item => !elements.some(element => element === item))
    const nextBreed = rest[Math.floor(Math.random() * rest.length)]
    return nextBreed
  }

  const increaseScore = () => {
    const nextBreed = getNextRandom()
    setNewRandomList({ list: breeds, current: nextBreed })
    dispatch({ type: AppActionKind.INCREASE, payload: { nextBreed } })
  }

  const decreaseScore = () => {
    dispatch({ type: AppActionKind.DECREASE })
  }

  const newGame = () => {
    const nextBreed = breeds[Math.floor(Math.random() * breeds.length)]
    setImageUrl('')
    setNewRandomList({ list: breeds, current: nextBreed })
    dispatch({ type: AppActionKind.NEW_GAME, payload: { nextBreed } })
  }

  const switchMode = () => {
    setIsCheatMode(!isCheatMode)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      const fetchAllBreeds = async () => {
        const { message } = await getBreeds()
        const breeds = Object.keys(message)
        setBreeds(breeds)
      }
      fetchAllBreeds()
    }
  }, [])

  useEffect(() => {
    if (currentBreed) {
      const fetchBreedImage = async () => {
        const { message } = await getDogImage(currentBreed)
        setImageUrl(message)
      }
      fetchBreedImage()
    }
  }, [currentBreed])

  const finished = breeds.length === guessed.length

  const value = {
    breeds,
    currentBreed,
    finished,
    guessed,
    imageUrl,
    isCheatMode,
    randomItems,
    score,
    decreaseScore,
    increaseScore,
    newGame,
    switchMode,
  }


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default Context