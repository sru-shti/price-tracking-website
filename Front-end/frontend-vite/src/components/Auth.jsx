import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    if (isSignup) {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up!');
    } else {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User signed in!');
    }

    // Get the ID Token of the logged-in user
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken();
      console.log('Firebase ID Token:', idToken);
      // You can now save the token or use it for your backend API calls
    }
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Signup' : 'Signin'}</h2>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">{isSignup ? 'Signup' : 'Signin'}</button>
      <button type="button" onClick={() => setIsSignup(!isSignup)}>Switch to {isSignup ? 'Signin' : 'Signup'}</button>
    </form>
  );
}

export default Auth;
