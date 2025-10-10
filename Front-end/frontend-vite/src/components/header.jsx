// src/components/Header.jsx
import React, { useState } from 'react';
import Auth from './Auth.jsx';

function Header() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#3498db',
      color: '#fff'
    }}>
      <h1 style={{ margin: 0, cursor: 'pointer' }}>Price Tracker</h1>

      <div>
        <button
          onClick={() => setShowAuth(!showAuth)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          aria-label="Toggle authentication panel"
        >
          &#9776; {/* Hamburger menu icon */}
        </button>
        {showAuth && (
          <div style={{
            position: 'absolute',
            right: 20,
            top: 50,
            background: 'white',
            color: 'black',
            padding: 20,
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <Auth />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
