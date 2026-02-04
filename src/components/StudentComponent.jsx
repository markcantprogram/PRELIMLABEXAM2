import { useState } from 'react'
import './StudentComponent.css'

function initials(name) {
  if (!name) return ''
  return name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function nameToGmail(name) {
  const base = String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .join('')

  return `${base || 'student'}@gmail.com`
}

function toPHContact(rawPhone, seed = 0) {
  // Try to extract digits from API phone (usually includes punctuation/ext).
  const digits = String(rawPhone || '').replace(/\D/g, '')

  // Prefer a PH-like mobile number if we can get at least 10 digits.
  const last10 = digits.length >= 10 ? digits.slice(-10) : ''

  // Fallback: generate a deterministic PH-style mobile number: 9XX XXX XXXX
  const fallback =
    String(9000000000 + ((seed * 2654435761) % 999999999)).padStart(10, '0')

  const ten = last10 || fallback
  const a = ten.slice(0, 3)
  const b = ten.slice(3, 6)
  const c = ten.slice(6, 10)
  return `+63 ${a} ${b} ${c}`
}

export default function StudentComponent({
  name,
  email,
  phone,
  course,
  year,
  showContactInfo = false,
}) {
  const [show, setShow] = useState(false)

  const emailText = email ? String(email) : nameToGmail(name)
  const contactText = toPHContact(phone, initials(name).charCodeAt(0) || 0)

  const showInfo = showContactInfo || show

  return (
    <article className="student-card modern">
      <div className="avatar" aria-hidden>
        {initials(name)}
      </div>

      <div className="student-main">
        <div className="student-row">
          <h3 className="student-name">{name}</h3>
          <div className="badges">
            <span className="badge course">{course}</span>
            <span className="badge year">Y{year}</span>
          </div>
        </div>

        {showInfo && (
          <div className="student-details">
            <div className="student-meta">
              <div className="meta-row">
                <span className="meta-label">Email</span>
                <span className="meta-value" title={emailText}>
                  {emailText}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Contact</span>
                <span className="meta-value" title={contactText}>
                  {contactText}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="student-actions">
        <button 
          className="btn small" 
          onClick={() => setShow((s) => !s)}
          aria-expanded={show}
          aria-label={show ? `Hide details for ${name}` : `Show details for ${name}`}
        >
          {show ? 'Hide' : 'Details'}
        </button>
        <button 
          className="btn outline small" 
          onClick={() => {
            // Better user feedback - could be replaced with actual navigation
            const confirmed = window.confirm(`Open profile for ${name}?`)
            if (confirmed) {
              // In a real app, this would navigate to the profile page
              console.log(`Opening profile for ${name}`)
            }
          }}
          aria-label={`View profile for ${name}`}
        >
          Profile
        </button>
      </div>
    </article>
  )
}
