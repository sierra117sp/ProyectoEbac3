
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <>
      <nav style={{ background: '#222', padding: '1rem' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
        <Link to="/detail" style={{ color: '#fff', marginRight: '1rem' }}>Detalle</Link>
        <Link to="/favorites" style={{ color: '#fff' }}>Favoritos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
