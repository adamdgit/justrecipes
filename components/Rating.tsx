'use client'

import { faStar as starSOlid, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as starOutline } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';
import React from 'react';

type Props = {
  user_id: string | null,
  rating: number,
  user_rating: number,
  count: number,
  recipe_id: number
}

export default function Rating({ user_id, rating, user_rating, count, recipe_id } : Props) {
  // calculate how many of each star exists, to then map over
  const fullStars = Math.floor(rating);
  const halfStars = (rating % 1 >= 0.5) ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const [showModal, setShowModal] = useState(false);
  const [userRating, setUserRating] = useState(0);

  async function handleUserRating(num: number) {
    if (!user_id || user_rating > 0) return

    const response = await fetch(
      `http://localhost:3000/api/recipe/rate?userid=${user_id}&rating=${num}&recipeid=${recipe_id}`,
      { method: "POST" }
    );

    if (!response.ok) {
      // TODO update rating state, user has rated
    } else {

    }
  }

  return (
    <React.Fragment>
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
        {user_id ? <span>{count} votes</span> : null}

        {user_id ? 
          <button className='btn' onClick={() => setShowModal(!showModal)}>
            Rate this recipe
          </button> 
        : null}
      </div>

      {showModal && !user_rating ? <div className='rating-modal'>
        Give a rating:
        <div>
          {Array(5).fill(0).map((_, i) => (
            <FontAwesomeIcon 
              key={i} 
              width={20}
              height={20}
              icon={userRating >= (i +1) ? starSOlid : starOutline} 
              style={userRating >= (i +1) ? {color: "var(--color1)", cursor: 'pointer'} : {cursor: 'pointer'}}
              onClick={() => handleUserRating(i +1)} 
              onPointerEnter={() => setUserRating(i +1)} 
            />
          ))}
        </div>
      </div> 
      : showModal && <div className='rating-modal'>
      You rated:
      <div>
        {Array(5).fill(0).map((_, i) => (
          <FontAwesomeIcon 
            key={i} 
            width={20}
            height={20}
            icon={user_rating >= (i +1) ? starSOlid : starOutline} 
            style={user_rating >= (i +1) ? {color: "var(--color1)", cursor: 'pointer'} : {cursor: 'pointer'}}
          />
        ))}
      </div>
    </div>}
    </React.Fragment>
  )
}