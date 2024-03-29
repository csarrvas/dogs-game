import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Questionnaire = () => {
  const { currentBreed, finished, imageUrl, isCheatMode, randomOptions, score, decreaseScore, increaseScore, newGame } = useContext(AppContext)
  const [selectedDog, setSelectedDog] = useState<string>('')

  const handleSelect = () => {
    if (selectedDog === currentBreed) {
      increaseScore()
    } else {
      decreaseScore()
    }
    setSelectedDog('')
  }

  if (score <= 0 || finished) {
    return (
      <>
        {<h1>{finished ? 'You won, congratulations!' : 'Sorry you lost...'}</h1>}
        {finished && <p>Your score was {score}pts</p>}
        <button style={{ padding: '0.5rem' }} onClick={newGame}>Reset the game</button>
      </>
    )
  }

  return (
    <>
      <h1>Questionnaire</h1>
      {currentBreed && (
        <div style={{ display: 'flex', justifyContent: isCheatMode ? 'space-between' : 'flex-end', alignItems: 'center', marginBottom: '1.5rem' }}>
          {isCheatMode && <span>Answer: {currentBreed}</span>}
          <h3>Score: {score}pts</h3>
        </div>
      )}
      {imageUrl && <img alt="Dog breed" src={imageUrl} style={{ height: '300px', width: '300px', objectFit: 'cover' }} />}
      <div style={{ paddingLeft: '2rem' }}>
        {randomOptions.map(dog => (
          <div key={`option-${dog}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type='radio' id={`option-${dog}`} value={dog} checked={selectedDog === dog} onChange={() => setSelectedDog(dog)} style={{ width: '1.5rem', height: '1.5rem' }} />
            <label htmlFor={`option-${dog}`}>{dog}</label>
          </div>
        ))}
      </div>
      {currentBreed ? (
        <button style={{ padding: '0.5rem' }} onClick={handleSelect} disabled={!selectedDog}>Check</button>
      ) : (
        <button style={{ padding: '0.5rem' }} onClick={newGame}>Let's play!</button>
      )}
    </>
  )
}

export default Questionnaire
