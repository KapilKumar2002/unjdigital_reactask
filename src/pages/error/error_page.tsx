import React from 'react'
import './error-style.css'

interface ErrorScreenProps {
  message: string
  onRetry: () => void
}

const ErrorPage: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-box">
        <h2 className="error-title">Oops! Something went wrong.</h2>
        <p className="error-message">{message}</p>
        <button className="retry-button" onClick={onRetry}>Retry</button>
      </div>
    </div>
  )
}

export default ErrorPage;
