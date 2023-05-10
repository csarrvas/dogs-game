import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ReactComponent as CheckMark } from '../assets/check-mark.svg';

const BreedsList = () => {
  const { breeds, guessed, isCheatMode, switchMode } = useContext(AppContext)

  const isGuessedBreed = (breed: string) => {
    const isGuessed = guessed.some(item => item === breed)
    return isGuessed
  }

  return (
    <>
      <button onClick={switchMode}>Swich to {isCheatMode ? 'normal' : 'cheat'} mode</button>
      <h2>List of breeds</h2>
      {breeds.map(breed => (
        <div key={breed} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          {isGuessedBreed(breed) && <CheckMark style={{ height: '20px', width: '20px', fill: '#008000' }} />}
          <p style={{ marginBottom: '1rem' }}>{breed}</p>
        </div>
      ))}
    </>
  )
}

export default BreedsList