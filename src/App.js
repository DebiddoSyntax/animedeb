import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AnimeList from './AnimeList';
import Animeprofile from './Animeprofile';



function App() {
  
  return (
    <div className='bg-black'>
    <Router>
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/profile/:id" element={<Animeprofile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;