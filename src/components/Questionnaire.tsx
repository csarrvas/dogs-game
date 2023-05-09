import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Questionnaire = () => {
  const { currentBreed, randomItems, start } = useContext(AppContext)

  return (
    <div>
      <h1>Questionnaire</h1>
      <span>Response: {currentBreed}</span>
      {randomItems.map(dog => <p key={dog}>{dog}</p>)}
      <button onClick={start}>Let's play!</button>
    </div>
  )
}

export default Questionnaire
