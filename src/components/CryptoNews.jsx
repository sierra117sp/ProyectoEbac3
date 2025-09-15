import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NEWS_API_KEY = 'demo'; // Reemplaza por tu propia API key de NewsAPI si tienes una
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const CryptoNews = ({ coinName }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(NEWS_API_URL, {
          params: {
            q: coinName,
            language: 'es',
            sortBy: 'publishedAt',
            apiKey: NEWS_API_KEY,
            pageSize: 5,
          },
        });
        setArticles(response.data.articles);
      } catch (err) {
        setError('No se pudieron cargar las noticias.');
      }
      setLoading(false);
    };
    fetchNews();
  }, [coinName]);

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>{error}</p>;
  if (!articles.length) return <p>No hay noticias recientes.</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Noticias recientes sobre {coinName}</h3>
      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {articles.map(article => (
          <li key={article.url} style={{ marginBottom: '1rem', background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: '#007bff', textDecoration: 'none' }}>{article.title}</a>
            <p style={{ margin: '0.5rem 0', color: '#555' }}>{article.description}</p>
            <span style={{ fontSize: '0.9em', color: '#888' }}>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoNews;
