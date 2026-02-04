import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <aside
      className="app-sidebar"
      aria-label="Sidebar"
    >
      <div className="sidebar-inner">
        <div className="sidebar-brand">
          <div className="sidebar-logo" aria-hidden="true">
            SI
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-appname">Student Info</div>
            <div className="sidebar-appsub">Navigation</div>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Sidebar navigation">
          <div className="sidebar-section">Main</div>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>Home</span>
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <span>Students</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footnote">
            Tip: Use the links above to navigate.
          </div>
        </div>
      </div>
    </aside>
  )
}
