import React, { createContext, useState } from 'react'


export const AnimeprofileContext = createContext();




const ProfileContext = ({ children }) => {
    

   
    const [profile, setProfile] = useState({})



return (
        <AnimeprofileContext.Provider value={{profile, setProfile}}>
                {children}
        </AnimeprofileContext.Provider>

  )
}

export default ProfileContext