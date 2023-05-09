import Questionnaire from './components/Questionnaire';
import './App.css'
import BreedsList from './components/BreedsList';
import AppContext from './context/AppContext';

function App() {
  
  return (
    <AppContext>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BreedsList />
        </div>
        <div style={{ width: '50%' }}>
          <Questionnaire />
        </div>
      </div>
    </AppContext>
  )
}

export default App
