import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'

const Questionnaire = () => {
  const { breeds, currentBreed, finished, imageUrl, isCheatMode, randomItems, score, start, decreaseScore, increaseScore, reset } = useContext(AppContext)
  const [selectedDog, setSelectedDog] = useState<string>('')

  const handleSelect = () => {
    if (selectedDog === currentBreed) {
      increaseScore()
    } else {
      decreaseScore()
    }
    setSelectedDog('')
  }

  if (!breeds.length) {
    return <Spinner />
  }

  if (score <= 0 || finished) {
    return (
      <>
        {<h1>{finished ? 'You won, congratulations!' : 'Sorry you lost'}</h1>}
        <button style={{ padding: '0.5rem' }} onClick={reset}>Reset the game</button>
      </>
    )
  }

  return (
    <>
      <h1>Questionnaire</h1>
      <div style={{ display: 'flex', justifyContent: isCheatMode ? 'space-between' : 'flex-end', marginBottom: '1.5rem' }}>
        {isCheatMode && <span>Answer: {currentBreed}</span>}
        <h3>Score: {score}pts</h3>
      </div>
      {imageUrl && <img alt="Dog breed" src={imageUrl} style={{ height: '300px', width: '300px', objectFit: 'cover' }} />}
      <div style={{ paddingLeft: '2rem' }}>
        {randomItems.map(dog => (
          <div key={`option-${dog}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type='radio' id={`option-${dog}`} value={dog} checked={selectedDog === dog} onChange={() => setSelectedDog(dog)} />
            <label htmlFor={`option-${dog}`}>{dog}</label>
          </div>
        ))}
      </div>
      {currentBreed ? (
        <button style={{ padding: '0.5rem' }} onClick={handleSelect}>Select</button>
      ) : (
        <button style={{ padding: '0.5rem' }} onClick={start}>Let's play!</button>
      )}
    </>
  )
}

export default Questionnaire
