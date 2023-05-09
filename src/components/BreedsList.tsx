import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const BreedsList = () => {
  const { breeds } = useContext(AppContext)
  return (
    <>{breeds.map(breed => <p key={breed} style={{ marginBottom: '1rem' }}>{breed}</p>)}</>
  )
}

export default BreedsList