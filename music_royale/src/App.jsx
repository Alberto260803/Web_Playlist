import './App.css'
import { TournamentProvider } from './componentes/contextos/TournamentContext.jsx'
import Rutas from './componentes/rutas/Rutas.jsx'

function App() {
  return (
    <>
      <TournamentProvider>
        <Rutas />
      </TournamentProvider>
    </>
  )
}

export default App
