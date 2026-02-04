import { NavLink } from 'react-router-dom'
import './HeaderComponent.css'

export default function HeaderComponent() {
  return (
    <header className="app-header">
      <h1>Student Info App</h1>
      <nav>
        <NavLink to="/" className={({isActive})=> isActive? 'active' : ''} end>Home</NavLink>
        <NavLink to="/students" className={({isActive})=> isActive? 'active' : ''}>Students</NavLink>
      </nav>
    </header>
  )
}
