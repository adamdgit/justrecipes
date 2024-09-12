'use client'

import { faStar as starSOlid, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as starOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Rating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStars = (rating % 1 >= 0.5) ? 1 : 0; // return 1 if there is a half star
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className='rating-stars'>
      <span>Rating: </span>
      <div className='stars'>
        {Array(fullStars).fill(0).map((_, i) => (
          <FontAwesomeIcon key={i} icon={starSOlid} />
        ))}
        {Array(halfStars).fill(0).map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStarHalfAlt} />
        ))}
        {Array(emptyStars).fill(0).map((_, i) => (
          <FontAwesomeIcon key={i} icon={starOutline} />
        ))}
      </div>
    </div>
  )
}