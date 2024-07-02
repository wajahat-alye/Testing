// AuthComponent.js

import React, { useState } from 'react';
import { auth, firestore } from './firebaseConfig';

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [emailForReset, setEmailForReset] = useState('');

  const handleSignup = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;

        user.sendEmailVerification()
          .then(() => {
            alert('Verification email sent. Please check your inbox and verify your email before signing in.');
          })
          .catch((error) => {
            alert('Error sending verification email: ' + error.message);
          });

        firestore.collection('users').doc(uid).set({
          name: name,
          username: username,
          email: email,
        })
        .then(() => {
          console.log('User data saved to Firestore');
        })
        .catch((error) => {
          console.error('Error saving user to Firestore: ', error);
        });
      })
      .catch((error) => {
        alert('Error signing up: ' + error.message);
      });
  };

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          console.log('User is signed in with a verified email.');
          // Redirect or perform actions after successful login
        } else {
          alert('Please verify your email before signing in.');
        }
      })
      .catch((error) => {
        alert('Error signing in: ' + error.message);
      });
  };

  const handleForgotPassword = () => {
    auth.sendPasswordResetEmail(emailForReset)
      .then(() => {
        alert('Password reset email sent. Please check your inbox to reset your password.');
      })
      .catch((error) => {
        alert('Error sending password reset email: ' + error.message);
      });
  };

  return (
    <div className="container">
      <form className="registration form">
        {/* Your signup form inputs */}
        <button type="button" className="signupbtn" onClick={handleSignup}>Sign Up</button>
      </form>

      <form className="login form">
        {/* Your login form inputs */}
        <button type="button" className="loginbtn" onClick={handleLogin}>Login</button>
      </form>

      <form className="forgot form">
        {/* Your forgot password form inputs */}
        <button type="button" className="forgotbtn" onClick={handleForgotPassword}>Forgot Password</button>
      </form>
    </div>
  );
};

export default AuthComponent;
