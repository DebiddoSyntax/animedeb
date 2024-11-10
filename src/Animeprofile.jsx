import {React, useContext } from 'react'
import {AnimeprofileContext} from './context/ProfileContext'



const Animeprofile = () => {

  const {profile} = useContext(AnimeprofileContext) 
 
  return (
    <div>
      <div>
        <img src={profile.image} alt={profile.image} />
      </div>
      <div>{profile.title}</div>
      <div>
        <div>Summary</div>
        <p>{profile.synpnosis}</p>
      </div>
    </div>
  )
}

export default Animeprofile