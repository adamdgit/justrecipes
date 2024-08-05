import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function SearchBar() {
  return (
    <form method='post'>
      <label className='search-label' htmlFor='searchbar'>Search</label>
      <span className='searchbar'>
        <input className='search-input' name='searchbar' type='search' />
        <button className='search-btn'>
          <FontAwesomeIcon icon={faSearch} style={{width: '20px'}} />
        </button>
      </span>
    </form>
  )
}
