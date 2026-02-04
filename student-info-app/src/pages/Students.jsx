import { useEffect, useState } from 'react'
import StudentComponent from '../components/StudentComponent'
import './Students.css'

const MIN_STUDENTS = 9
const COURSES = ['Computer Science', 'Information Technology', 'Software Engineering', 'Data Science']

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    try {
      // Intentional delay so the loading state is visible on refresh.
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: AbortSignal.timeout(10000) // 10 second timeout
      })
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      }
      
      const data = await res.json()

      // Show at least 9 "student sections" by taking the first 9 API users.
      // JSONPlaceholder typically returns 10 users, so this is stable on refresh.
      const slice = Array.isArray(data) ? data.slice(0, MIN_STUDENTS) : []
      const mapped = slice.map((u, i) => ({
        id: u?.id ?? i + 1,
        name: u?.name ?? 'Unknown Student',
        email: u?.email ?? null,
        phone: u?.phone ?? null,
        course: COURSES[(u?.id ?? i) % COURSES.length],
        year: 1 + (((u?.id ?? i) + 1) % 4),
      }))
      
      setStudents(mapped)
      setRetryCount(0)
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your internet connection.')
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your internet connection and try again.')
      } else {
        setError(err.message || 'Failed to fetch students. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    fetchStudents()
  }

  return (
    <section className="students-page">
      <div className="students-header">
        <div>
          <h2>Students</h2>
          <p className="students-subtitle">
            {loading 
              ? 'Loading student information...' 
              : error 
                ? 'Unable to load students' 
                : `${students.length} student${students.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <button 
          onClick={handleRetry} 
          disabled={loading}
          className="refresh-btn"
          aria-label="Refresh student list"
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 2V6L12 2L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14V10L4 14L8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 8C2 5.23858 4.23858 3 7 3L12 2M14 8C14 10.7614 11.7614 13 9 13L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>

      {loading && !error && (
        <div className="loading-state" role="status" aria-live="polite">
          <div className="loading-spinner"></div>
          <p>Loading students...</p>
        </div>
      )}

      {error && (
        <div className="error-state" role="alert">
          <div className="error-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h3>Unable to load students</h3>
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
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
              showContactInfo
            />
          ))}
        </div>
      )}
    </section>
  )
}
