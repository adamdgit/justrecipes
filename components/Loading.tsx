import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Loading({ message }: { message?: string }) {
  return (
    <div className='loading'>
      <span>{message ? message : "loading..."}</span>
      <FontAwesomeIcon icon={faSpinner} className='loading-spinner' />
    </div>
  )
}
