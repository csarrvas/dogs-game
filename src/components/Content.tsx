import { useContext } from 'react'
import BreedsList from './BreedsList'
import Questionnaire from './Questionnaire'
import Spinner from './Spinner'
import { AppContext } from '../context/AppContext'
import useWindowSize from '../hooks/useWindowSize'
import { breakpoints } from '../constants'

const Content = () => {
  const { allBreeds, breeds } = useContext(AppContext)
  const { width } = useWindowSize()
  const { laptop: { min } } = breakpoints

  console.log({allBreeds, breeds})

  if (!allBreeds.length) {
    return <Spinner />
  }

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: width < min ? 'column' : 'row', gap: '4rem', justifyContent: 'center' }}>
      <div style={{
        width:  width < min ? '100%' : '50%',
        display: breeds.length ? 'flex' : 'none',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: width < min ? 'unset' : 'auto',
        maxHeight: width < min ? 'unset' : 'calc(100vh - 4rem)',
        }}>
        <BreedsList />
      </div>
      <div style={{ width: width < min ? '100%' : '50%', order: width < min ? -1 : 'unset' }}>
        <Questionnaire />
      </div>
    </div>
  )
}

export default Content