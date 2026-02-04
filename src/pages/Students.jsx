import { useEffect, useState } from 'react'
import './Students.css'
import StudentComponent from '../components/StudentComponent'

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  const fetchStudents = async (signal) => {
    setLoading(true)
    setError('')
  
    try {
      // 2-second artificial delay before calling the API
      await new Promise((resolve) => setTimeout(resolve, 2000))
  
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal,
      })
  
      if (!res.ok) {
        throw new Error(`Failed to fetch students (status ${res.status})`)
      }
  
      const data = await res.json()
  
      const courses = [
        'Computer Science',
        'Information Technology',
        'Data Science',
        'Software Engineering',
      ]
  
      const courseCounts = {}
      const enriched = data.map((user, index) => {
        const course = courses[index % courses.length]
        courseCounts[course] = (courseCounts[course] || 0) + 1
  
        const year = (index % 4) + 1
  
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          course,
          year,
        }
      })
  
      setStudents(enriched)
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message || 'Failed to load students.')
    } finally {
      setLoading(false)
    }
  
  }

  useEffect(() => {
    const controller = new AbortController()
    fetchStudents(controller.signal)

    return () => controller.abort()
  }, [])

  const handleRetry = () => {
    setRetryCount((c) => c + 1)
    const controller = new AbortController()
    fetchStudents(controller.signal)
  }

  const totalStudents = students.length

  return (
    <section className="students-page">
      <header className="students-header">
        <div>
          <h1>Student Info App</h1>
          <p className="subtitle">
            {totalStudents > 0
              ? `${totalStudents} students found`
              : 'Browse detailed student information including course and year level.'}
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={handleRetry}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden />
              Refreshing...
            </>
          ) : (
            'Refresh'
          )}
        </button>
      </header>

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner" />
          <h3>Loading students...</h3>
          <p>Please wait while we fetch the latest student data.</p>
        </div>
      )}

      {!loading && error && (
        <div className="error-state">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          {retryCount > 0 && (
            <p className="retry-note">Retry attempt: {retryCount}</p>
          )}
          <button onClick={handleRetry} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && students.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3>No students found</h3>
          <p>There are no students to display at this time.</p>
          <button onClick={handleRetry} className="retry-btn">
            Refresh
          </button>
        </div>
      )}

      {!loading && !error && students.length > 0 && (
        <div className="students-grid fade-in">
          {students.map((s) => (
            <StudentComponent
              key={s.id}
              name={s.name}
              email={s.email}
              phone={s.phone}
              course={s.course}
              year={s.year}
              // showContactInfo removed so Details button controls visibility
            />
          ))}
        </div>
      )}
    </section>
  )
}