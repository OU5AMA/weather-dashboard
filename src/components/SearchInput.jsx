import { useState } from 'react';
import { forwardToCoords } from '../api/api';


export default function SearchInput({ setCoords, setCity }) {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const { lat, lon, name } = await forwardToCoords(query);
      setCoords({ lat, lon });
      setCity(name);
    } catch (err) {
      console.error('City not found:', err);
      alert('City not found. Please try again.');
    }

    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} style={{ marginTop: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a city name..."
        style={{
          padding: '10px',
          width: '250px',
          marginRight: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Search
      </button>
    </form>
  );
}
