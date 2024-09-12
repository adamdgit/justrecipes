import React from 'react'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <a href='/create' className="generate-btn">Create Recipe</a> 
      <a href='/saved' className="generate-btn">Saved Recipes</a> 
    </nav>
  )
}
