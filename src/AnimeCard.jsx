import { Link } from 'react-router-dom';

const AnimeCards = ({ data }) => {



  const id = data._id;
  
  return (
      <Link to={`/profile/${id}`}> 
        <div className='w-auto py-0'>
          <div className='h-52 md:h-60 lg:h-72'>
            <img className='w-full h-full' src={data.image} alt={data.title} />
          </div>
          <h3 className='py-3 font-semibold text-lg md:text-lg'>{data.title}</h3>
        </div>
      </Link>
  );
};

export default AnimeCards