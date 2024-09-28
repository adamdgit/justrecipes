import { faFileImport, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default async function Page() {
      
  return (
    <div className='content-wrap'>  
      <h1>Welcome to Easy Recipes</h1>

      <div className='home-info'>
        <p>
          Easy Recipes lets you browse a catalogue of recipes which have been generated 
          by AI from Youtube videos. Logged in users can generate recipes from videos.
        </p>
        
        <p>
          Login with the test account here:
        </p>
        <a href='/login' className='btn'>Login</a>

        <ul className='features-list'> 
          <li>
            <span>Convert videos to recipes</span>
            <FontAwesomeIcon icon={faFileImport} />
          </li>
          <li>
            <span>Save your favourite recipes</span>
            <FontAwesomeIcon icon={faHeart} />
          </li>
          <li>
            <span>Give a recipe rating</span>
            <FontAwesomeIcon icon={faStar} />
          </li>
        </ul>

        <p>
          Anyone can browse recipes without an account.
          The site is designed to be simple and to the point, so you can get to cooking and spend
          less time scrolling looking for the ingredients.
        </p>
      </div>
    </div>
  );
}
