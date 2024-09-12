'use client'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

type Props = {
  id: string, 
  user_ID: string
}

export default function SaveRecipe({ id, user_ID }: Props) {

  const [error, setError] = useState();

  async function handleSaveRecipe() {
    const result = await fetch(`http://localhost:3000/api/recipe/save?recipeid=${id}&userid=${user_ID}`,
      {
        method: "POST"
      }
    );
    const data = await result.json(); // success response
  }

  return (
    <div>
      <FontAwesomeIcon 
        onClick={() => handleSaveRecipe()} 
        icon={faHeart} 
        width={'20px'} height={'20px'} 
      />
    </div>
  )
}
