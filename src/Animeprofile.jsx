import { useEffect, useState } from 'react'
import { useParams} from 'react-router';



const Animeprofile = () => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const apiKey = process.env.REACT_APP_API_KEY;
  const { id } = useParams();

  

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://anime-db.p.rapidapi.com/anime/by-id/${id}`;
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
        setData(result);
        setError(null);
      } catch (error) {
        setError('Failed to load data');
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey, id]);

  if(loading){
    return <p className="text-white justify-center text-center mt-10">Loading...</p>
  }

  if(error){
    return <p className="text-red-500 justify-center text-center mt-10">{error}</p>
  }

 
  return (
    <div className='py-20 px-5 md:px-10 lg:px-20 text-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6'>
      <div className='col-span-1 w-full'>
        <img src={data.image} alt={data.image} className='w-full h-[520px]'/>
      </div>
      
      <div className='col-span-1 lg:col-span-2'>
        <div className='my-5 text-2xl md:text-4xl font-bold'>{data.title}</div>
        <div className='mt-10 px-10 py-3 bg-orange-800 w-40'>Summary</div>
        <p className='text-lg font-normal text-justify mt-5'>{data.synopsis}</p>
      </div>
    </div>
  )
}

export default Animeprofile