import { Route, Routes } from 'react-router-dom'
import Principal from '../paginas/Principal.jsx'

const Rutas = () => {
  return (
    <Routes>
        <Route path='/' element={<Principal />} />
    </Routes>
  )
}

export default Rutas