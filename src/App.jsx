import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Import from './pages/Import'
import Quiz from './pages/Quiz'
import Analysis from './pages/Analysis'
import Report from './pages/Report'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/import" element={<Import />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  )
}

export default App
