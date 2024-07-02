// SignOutComponent.js

import React from 'react';
import { auth } from './firebaseConfig'; // Adjust the path based on your project structure

const SignOutComponent = () => {
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out successfully');
        window.location.href = "index.html"; // Redirect to your homepage or desired route
      })
      .catch((error) => {
        alert('Error signing out: ' + error.message);
      });
  };

  return (
    <div>
      <button id="signoutbtn" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOutComponent;
