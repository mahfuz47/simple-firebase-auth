import './App.css';
import app from './firebase.init';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"
import { useState } from 'react';
const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();


  const handleGoogleSignIn = () => {
    console.log('working');
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error => {
      console.log('error',error);
    })
  }

  const handleGitSignIn = ()=>{
    signInWithPopup(auth, gitProvider)
    .then(result => {
      const user = result.user;
      setUser(user)
      console.log(user)
    })
    .catch(error => {
      console.log(error);
    })
  }
  const handleSignOut = () =>{
      signOut(auth)
      .then (()=>{
        setUser({})
      })
      .catch(error=>{
        setUser({});
      })
  }
  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        // <div>
        <>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <button onClick={handleGitSignIn}>Github Sign In</button>
        </>
        // </div>
      )}
      <h2>Name: {user.displayName}</h2>
      <h2>Email: {user.email}</h2>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
