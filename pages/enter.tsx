import React, { useContext } from 'react'

import { UserContext } from '../lib/context'
import { auth, googleAuthProvider } from '../lib/firebase'

const EnterPage: React.FC = () => {
  const { user, username } = useContext(UserContext)

  return (
    <main>
      <h1>Sign Up</h1>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  )
}

const UsernameForm: React.FC = () => {
  return null
}

const SignInButton: React.FC = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src="/logo-google.png" /> Se connecter avec Google
    </button>
  )
}

const SignOutButton: React.FC = () => {
  return <button onClick={() => auth.signOut()}>Se déconnecter</button>
}

export default EnterPage
