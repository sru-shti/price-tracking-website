import React from 'react';
import Header from './components/header.jsx';
import TrackProduct from './components/TrackProduct.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';

function App() {
  return (
    <>
      <Header />
      <h1>Hello, Firebase!</h1>
      <main style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
        {/* Add Signup and Signin for authentication */}
        <Signup />
        <Signin />

        <TrackProduct />
      </main>
    </>
  );
}

export default App;
