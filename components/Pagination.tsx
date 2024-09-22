'use client'

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
  start: number, 
  end: number,
  searchQuery: string 
}

export default function Pagination({ start, end, searchQuery }: Props) {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(start);

  // if client manually alters the url, this updates url to correct values from server
  useEffect(() => {
    router.push(`http://localhost:3000/search?query=${searchQuery}&start=${start}&end=${end}`)
  },[])
  
  return (
    <div className='pagination-wrap'>
      <ul className='pagination'>
        <li>
          <a 
            href={ `http://localhost:3000/search?query=${searchQuery}&start=${startIndex}&end=${startIndex+20}`}
            onClick={() => setStartIndex(startIndex - 20 < 0 ? 0 : startIndex - 20)}
          >
          <FontAwesomeIcon icon={faChevronLeft} />
         </a>
        </li>
        {Array(4).fill(0).map((_, i) => {
          return <li key={i}>
            <a href={
              `http://localhost:3000/search?query=${searchQuery}&start=${startIndex}&end=${startIndex+20}`
            } 
            style={start / 20 === i ? {color: "var(--color1)"} : {}}
            onClick={() => setStartIndex((i) * 20)}>
              {i +1}
            </a>
          </li>
        })}
        <li>
          <a 
            href={ `http://localhost:3000/search?query=${searchQuery}&start=${startIndex}&end=${startIndex+20}`}
            onClick={() => setStartIndex(startIndex + 20)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </li>
      </ul>
    </div>
  )
}
