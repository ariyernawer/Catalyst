import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Participant from './pages/Participant'
import Organizer from './pages/Organizer'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/participant" element={<Participant />} />
        <Route path="/organizer" element={<Organizer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App