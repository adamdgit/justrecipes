'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

export default function SearchBar() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <form method='post' action={`http://localhost:3000/search?query=${searchQuery}`}>
      <label className='search-label' htmlFor='searchbar'>Search</label>
      <span className='searchbar'>
        <input className='search-input' name='searchbar' type='search' onChange={(e) => setSearchQuery(e.target.value)} />
        <button className='search-btn' type='submit'>
          <FontAwesomeIcon icon={faSearch} style={{width: '20px'}} />
        </button>
      </span>
    </form>
  )
}
