import { Routes, Route } from 'react-router-dom'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Students from './pages/Students'

function App() {
  return (
    <div className="App app-shell">
      <Sidebar />
      <div className="app-shell-content">
        <HeaderComponent />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
