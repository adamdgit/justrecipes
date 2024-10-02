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

const calcFullStars = (x: number) => Math.floor(x);
const calcHalfStars = (x: number) => (x % 1 >= 0.5) ? 1 : 0;

export default function Rating({ user_id, rating, user_rating, count, recipe_id } : Props) {
  // calculate how many of each star exists, to then map over
  const [fullStars, setFullStars] = useState(calcFullStars(rating));
  const [halfStars, setHalfStars] = useState(calcHalfStars(rating));
  const [emptyStars, setEmptyStars] = useState(5 - fullStars - halfStars);

  const [ratingCcount, setCount] = useState(count);
  const [showModal, setShowModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [existingRating, setExistingRating] = useState(user_rating);

  async function handleUserRating(num: number) {
    if (!user_id || existingRating > 0) return

    const response = await fetch(
      `/api/recipe/rate?userid=${user_id}&rating=${num}&recipeid=${recipe_id}`,
      { method: "POST" }
    );

    if (!response.ok) {
      // TODO update rating state, user has rated
    } else {
      // calculate new rating to display update to user
      const data = await response.json();
      let a = calcFullStars(data.rating);
      let b = calcHalfStars(data.rating);
      let c = 5 - a - b;

      setCount(data.count);
      setFullStars(a);
      setHalfStars(b);
      setEmptyStars(c);
      setExistingRating(userRating);
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
        {user_id ? <span>{ratingCcount} votes</span> : null}

        {user_id ? 
          <button className='btn' onClick={() => setShowModal(!showModal)}>
            Rate this recipe
          </button> 
        : null}
      </div>

      {showModal && !existingRating ? <div className='rating-modal'>
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
            icon={existingRating >= (i +1) ? starSOlid : starOutline} 
            style={existingRating >= (i +1) ? {color: "var(--color1)", cursor: 'pointer'} : {cursor: 'pointer'}}
          />
        ))}
      </div>
    </div>}
    </React.Fragment>
  )
}