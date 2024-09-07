import React from 'react'

export default function Navigation() {
  return (
    <nav className="navbar">
      <ul className='nav-buttons'>
        <li><a href='/'>Home</a></li>
        <li><a href='/trending'>Trending</a></li>
        <li><a href='/about'>About</a></li>
      </ul>
    </nav>
  )
}
