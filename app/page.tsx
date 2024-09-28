import { faFileImport, faFloppyDisk, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default async function Page() {
      
  return (
    <div className='content-wrap'>  
      <h1>Welcome to Easy Recipes</h1>

      <div className='home-info'>
        <p>
          Easy Recipes lets you browse a catalogue of recipes which have been generated 
          by AI from Youtube videos. It only takes a few easy steps.
        </p>
        
        <p>
          Sign up now to access these features:
        </p>
        <ul className='features-list'> 
          <li>
            <span>Convert videos to recipes</span>
            <FontAwesomeIcon icon={faFileImport} />
          </li>
          <li>
            <span>Save your favourite recipes</span>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </li>
          <li>
            <span>Give a recipe rating</span>
            <FontAwesomeIcon icon={faStar} />
          </li>
        </ul>


        <a href='/login' className='btn'>Create Account</a>

        <p>
          Anyone can browse recipes without an account.
          The site is designed to be simple and to the point, so you can get to cooking and spend
          less time scrolling looking for the ingredients.
        </p>
      </div>
    </div>
  );
}
