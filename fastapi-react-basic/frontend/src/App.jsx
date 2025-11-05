
import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        if (!apiUrl) {
          throw new Error("VITE_API_URL is not defined. Please check your .env file.");
        }
        
        const response = await fetch(`${apiUrl}/api/hello`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMessage(data.message);
      } catch (e) {
        console.error("Failed to fetch message:", e);
        setError(`Failed to load message. ${e.message}`);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>FastAPI + React</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : message ? (
        <p>Message from backend: <strong>{message}</strong></p>
      ) : (
        <p>Loading message from backend...</p>
      )}
    </div>
  );
}

export default App;
