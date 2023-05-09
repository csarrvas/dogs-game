import { useState } from 'react'

type SetNewRandomListParams = {
  list: string[]
  current: string
}

const useRandomOptions = (number = 4) => {
  const [randomItems, setRandomItems] = useState<string[]>([])

  const setNewRandomList = ({ list, current }: SetNewRandomListParams) => {
    const elements: string[] = [current]

    for (let i = 1; i < number; i++) {
      const rest = list.filter(item => !elements.some(element => element === item))
      const newElement = rest[Math.floor(Math.random() * rest.length)]
      elements.push(newElement)
    }
    setRandomItems(elements.sort())
  }

  return {
    randomItems,
    setNewRandomList
  }
}

export default useRandomOptions
