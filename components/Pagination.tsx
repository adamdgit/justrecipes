'use client'

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
  start: number,
  searchQuery: string 
}

export default function Pagination({ start, searchQuery }: Props) {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(start);

  // if client manually alters the url, this updates url to correct values from server
  useEffect(() => {
    router.push(`/search?query=${searchQuery}&start=${start}`)
  },[])
  
  return (
    <div className='pagination-wrap'>
      <ul className='pagination'>
        <li>
          <a className='btn'
            href={ `/search?query=${searchQuery}&start=${startIndex}`}
            onClick={() => setStartIndex(startIndex - 20 < 0 ? 0 : startIndex - 20)}
          >
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
         </a>
        </li>
        <span>{start} - {start + 20}</span>
        <li>
          <a className='btn'
            href={ `/search?query=${searchQuery}&start=${startIndex}`}
            onClick={() => setStartIndex(startIndex + 20)}
          >Next
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </li>
      </ul>
    </div>
  )
}
