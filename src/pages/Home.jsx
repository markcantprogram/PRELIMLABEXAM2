import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentComponent from '../components/StudentComponent'
import './Home.css'

export default function Home() {
  const [previewNames, setPreviewNames] = useState([
    'Leanne Graham',
    'Ervin Howell',
    'Clementine Bauch',
    'Patricia Lebsack',
  ])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const data = await res.json()
        const next = Array.isArray(data)
          ? data
              .slice(0, 4)
              .map((u) => u?.name)
              .filter(Boolean)
          : []
        if (mounted && next.length === 4) setPreviewNames(next)
      } catch {
        // keep fallback preview names
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="home-hero">
      <div className="hero-content">
        <h2>Welcome to Student Info App</h2>
        <p className="lead">Browse students, view details, and fetch live sample data from a public API.</p>
        <div className="hero-ctas">
          <Link to="/students" className="btn primary">View Students</Link>
          <Link to="#features" className="btn">Learn More</Link>
        </div>
      </div>

      <aside className="hero-preview">
        <StudentComponent name={previewNames[0]} course="Computer Science" year={1} />
        <StudentComponent name={previewNames[1]} course="Information Technology" year={2} />
        <StudentComponent name={previewNames[2]} course="Software Engineering" year={3} />
        <StudentComponent name={previewNames[3]} course="Data Science" year={4} />
      </aside>

      <div id="features" className="features">
        <div className="feature">
          <h3>Live Data</h3>
          <p>Fetches users from JSONPlaceholder and maps them to student entries.</p>
        </div>
        <div className="feature">
          <h3>Reusable Components</h3>
          <p>Header and Student cards are implemented as reusable components with props and state.</p>
        </div>
        <div className="feature">
          <h3>Client Routing</h3>
          <p>Navigate between Home and Students using client-side routing.</p>
        </div>
      </div>
    </section>
  )
}
