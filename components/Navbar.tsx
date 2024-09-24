import React from 'react'

export default function Navbar() {
  return (
    <React.Fragment>
      <a href='/create' className="btn">Create Recipe</a> 
      <a href='/saved' className="btn">Saved Recipes</a> 
    </React.Fragment>
  )
}
