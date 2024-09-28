'use client'

import { ErrorMsg } from '@/types/main'
import { ADDRESS } from '@/utils/address'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

type Props = {
  id: string, 
  user_ID: string | null,
  isSaved: boolean
}

export default function SaveRecipe({ id, user_ID, isSaved }: Props) {

  const [errorMsg, setErrorMsg] = useState<ErrorMsg>({ msg: null, status: null });
  const [userHasSaved, setUserHasSaved] = useState(isSaved);
  const [isHovered, setIsHovered] = useState(false);

  async function handleSaveRecipe() {
    setErrorMsg({msg: null, status: null})

    if (!userHasSaved) {
      const response = await fetch(`${ADDRESS}/api/recipe/save?recipeid=${id}&userid=${user_ID}`,
        {
          method: "POST"
        }
      );
  
      if (!response.ok) {
        setErrorMsg({msg: response.statusText, status: response.status})
      } else {
        setUserHasSaved(true)
      }
    }

    if (userHasSaved) {
      const response = await fetch(`${ADDRESS}/api/recipe/unfollow?recipeid=${id}&userid=${user_ID}`,
        {
          method: "POST"
        }
      );
  
      if (!response.ok) {
        setErrorMsg({msg: response.statusText, status: response.status})
      } else {
        setUserHasSaved(false)
      }
    }
  }

  if (userHasSaved) {
    return (
      <button className='save-btn'
        onClick={() => handleSaveRecipe()}  
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {isHovered ? 
          <FontAwesomeIcon icon={faHeartBroken} />
          :        
          <FontAwesomeIcon 
            icon={faHeart} 
            width={20} height={20} 
            color='var(--color1)'
          />
        }
       
        Unfollow Recipe
      </button>
    )
  }

  if (!userHasSaved) {
    return (
      <button className='save-btn'
        onClick={() => handleSaveRecipe()}
      >
        <FontAwesomeIcon 
          icon={faHeart} 
          width={20} height={20} 
          fill='currentColor'
        />
        Save recipe
      </button>
    )
  }
}
