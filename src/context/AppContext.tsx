/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useEffect, useReducer, useRef, useState } from 'react'
import { getBreeds, getDogImage } from '../api'
import { AppState, AppAction, AppActionKind, AppContextType } from '../types';
import useRandomOptions from '../hooks/useRandomOptions';

const POINTS_PER_GUESS = 2
const INITIAL_SCORE = 10
const NUMBER_OF_GUESSES = 8

const initialState: AppState = {
  currentBreed: '',
  guessed: [],
  score: INITIAL_SCORE,
}

const defaultContext = {
  ...initialState,
  allBreeds: [],
  breeds: [],
  imageUrl: '',
  finished: false,
  isCheatMode: false,
  randomOptions: [],
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
  const [allBreeds, setAllBreeds] = useState<string[]>([])
  const [breeds, setBreeds] = useState<string[]>([])
  const [{ currentBreed, guessed, score }, dispatch] = useReducer(appReducer, initialState)
  const { randomOptions, setNewRandomOptions, getNewRandomList } = useRandomOptions()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isCheatMode, setIsCheatMode] = useState<boolean>(false)

  const getNextRandom = () => {
    const elements = [...guessed, currentBreed]
    const rest = breeds.filter(item => !elements.some(element => element === item))
    const nextBreed = rest[Math.floor(Math.random() * rest.length)]
    return nextBreed
  }

  const newGame = () => {
    const random = getNewRandomList({ list: allBreeds, number: NUMBER_OF_GUESSES })
    const nextBreed = random[Math.floor(Math.random() * random.length)]
    setImageUrl('')
    setIsCheatMode(false)
    setBreeds(random)
    setNewRandomOptions({ list: random, current: nextBreed })
    dispatch({ type: AppActionKind.NEW_GAME, payload: { nextBreed } })
  }

  const increaseScore = () => {
    const nextBreed = getNextRandom()
    setNewRandomOptions({ list: breeds, current: nextBreed })
    dispatch({ type: AppActionKind.INCREASE, payload: { nextBreed } })
  }

  const decreaseScore = () => {
    dispatch({ type: AppActionKind.DECREASE })
  }

  const switchMode = () => {
    setIsCheatMode(!isCheatMode)
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      const fetchAllBreeds = async () => {
        const { message } = await getBreeds()
        const fetchedBreeds = Object.keys(message)
        setAllBreeds(fetchedBreeds)
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

  const finished = Boolean(breeds.length && breeds.length === guessed.length)

  const value = {
    allBreeds,
    breeds,
    currentBreed,
    finished,
    guessed,
    imageUrl,
    isCheatMode,
    randomOptions,
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