import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Login from './pages/Login';
import Register from './pages/Register';
import ThemeToggle from './components/ThemeToggle';
import AppFooter from './components/AppFooter';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    const user = localStorage.getItem('loggedUser');
    setLoggedUser(user ? JSON.parse(user) : null);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setLoggedUser(null);
    alert('Sesión cerrada correctamente.');
  };

  return (
    <>
      <nav style={{ background: darkMode ? '#111' : '#222', padding: '1rem', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
          <Link to="/detail" style={{ color: '#fff', marginRight: '1rem' }}>Detalle</Link>
          <Link to="/favorites" style={{ color: '#fff', marginRight: '1rem' }}>Favoritos</Link>
          <Link to="/compare" style={{ color: '#fff', marginRight: '1rem' }}>Comparar</Link>
          {!loggedUser && <Link to="/login" style={{ color: '#fff', marginRight: '1rem' }}>Login</Link>}
          {!loggedUser && <Link to="/register" style={{ color: '#fff' }}>Registro</Link>}
        </div>
        {loggedUser && (
          <span style={{ color: '#fff', marginRight: '1rem' }}>Usuario: {loggedUser.email}</span>
        )}
        {loggedUser && (
          <button onClick={handleLogout} style={{ background: '#ff5252', color: '#fff', border: 'none', borderRadius: '20px', padding: '0.5rem 1.2rem', cursor: 'pointer', fontWeight: 'bold', marginRight: '1rem' }}>Logout</button>
        )}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
      <AppFooter />
    );
    </>
  );
}

export default App;
