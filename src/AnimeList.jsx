import React, { useState, useEffect, useCallback, useContext } from 'react';
import { FiSearch } from "react-icons/fi";
import {AnimeprofileContext} from './context/ProfileContext'
import { Link } from 'react-router-dom';

const AnimeCards = ({ data }) => {

  const {setProfile} = useContext(AnimeprofileContext)
  
  return (
      <Link to="/profile" onClick={()=> setProfile(data)}> 
        <div className='w-auto py-5' >
          <img className='w-full h-52 md:h-60 lg:h-72' src={data.image} alt={data.title} />
          <h3 className='py-3 font-semibold text-lg md:text-xl'>{data.title}</h3>
        </div>
      </Link>
  );
};

const AnimeList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const animePerPage = 20;
  const [totalAnime, setTotalAnime] = useState(0)


  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://anime-db.p.rapidapi.com/anime?page=${currentPage}&search=${keyword}&size=${animePerPage}&sortOrder=asc`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': `${apiKey}`,
          'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
      };

      setLoading(true);
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result.data || []);
        setTotalAnime(result.meta)
        setError(null);
      } catch (error) {
        setError('Failed to load data');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, keyword, apiKey]);

  

  const handleHome = () => {
      setCurrentPage(1);
      setKeyword('')
  }

  const totalPage = totalAnime ? Math.ceil(totalAnime.totalData/animePerPage) : 1;
  

  
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((value) => setKeyword(value), 3000),
    []
  );

  if (loading) return <p className="text-white justify-center text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 justify-center text-center mt-10">{error}</p>;

  return (
    <div>
      {/* Header with Search Bar */}
      <div className='fixed px-5 md:px-10 lg:px-20 w-full bg-black text-white flex justify-between items-center h-20 border-b-2 border-white'>
        <nav className='flex'>
          <ul className='flex'>
            <li className='pr-5 py-5 font-oi cursor-pointer' onClick={handleHome}>AnimeDeb</li>
          </ul>
        </nav>
        <div className='flex items-center border-2 py-3 px-3'>
          <FiSearch /> 
          <input 
            type="text" 
            className='text-white bg-black focus:outline-none ml-2' 
            placeholder='Enter anime title' 
            onChange={(e) => debouncedSearch(e.target.value)} 
          />
        </div>
      </div>
      

      {/* Anime Cards Grid */}
      <div className='text-white px-5 md:px-10 lg:px-20 py-32 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6'>
        {data.map((anime) => (
          <AnimeCards data={anime} key={anime._id} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 pb-6">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white px-4">Page {currentPage}</span>
        <button 
          onClick={() => setCurrentPage((prev) => prev + 1)} 
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          disabled={totalPage === currentPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AnimeList;
