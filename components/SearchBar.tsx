'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SearchBar() {

  // get search query after redirect to search page if it exists
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [searchQuery, setSearchQuery] = useState('');

  return (
    // default start and end for pagination
      <span className='searchbar'>
        <label className='search-label' htmlFor='searchbar'>Search</label>
        <input className='search-input' 
          placeholder='search existing recipes'
          defaultValue={query ?? ''}
          name='searchbar' 
          type='search' 
          onChange={(e) => setSearchQuery(e.target.value)} />
        <a href={`http://localhost:3000/search?query=${searchQuery}&start=0&end=20`} className='search-btn' type='submit'>
          <FontAwesomeIcon icon={faSearch} style={{width: '20px'}} />
        </a>
      </span>
  )
}
