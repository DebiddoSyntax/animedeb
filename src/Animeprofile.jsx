import {React, useContext, useEffect } from 'react'
import {AnimeprofileContext} from './context/ProfileContext'
import { useLocation } from 'react-router';



const Animeprofile = () => {

  const { pathname } = useLocation();
  useEffect(() => {
     window.scrollTo(0,0);
  }, [pathname]);

  const {profile} = useContext(AnimeprofileContext) 
 
  return (
    <div className='py-20 px-5 md:px-10 lg:px-20 text-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='col-span-1 w-full'>
        <img src={profile.image} alt={profile.image} className='w-full h-[520px]'/>
      </div>
      
      <div className='col-span-1 lg:col-span-2'>
        <div className='my-5 text-2xl md:text-4xl font-bold'>{profile.title}</div>
        <div className='mt-10 px-10 py-3 bg-orange-800 w-40'>Summary</div>
        <p className='text-lg font-normal text-justify mt-5'>{profile.synopsis}</p>
      </div>
    </div>
  )
}

export default Animeprofile