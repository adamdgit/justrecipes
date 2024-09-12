import React from 'react'

export default function Loading(message?: string) {
  return (
    <div className='loading'>{message ? message : "loading..."}</div>
  )
}
