import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  FormEventHandler,
} from 'react'
import debounce from 'lodash.debounce'
import { UserContext } from '../lib/context'
import { auth, firestore, googleAuthProvider } from '../lib/firebase'

type UsernameMessageProps = {
  username: string
  isValid: boolean
  isLoading: boolean
}

const EnterPage: React.FC = () => {
  const { user, username } = useContext(UserContext)

  return (
    <main>
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
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { user, username } = useContext(UserContext)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { uid, photoURL, displayName } = user

    const userDoc = firestore.doc(`users/${uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    // Transaction
    // Commit all or nothing
    const batch = firestore.batch()
    batch.set(userDoc, { username: formValue, photoURL, displayName })
    batch.set(usernameDoc, { uid })

    await batch.commit()
  }

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.toLowerCase()
    const usernameValidator = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    if (value.length < 3) {
      setFormValue(value)
      setIsLoading(false)
      setIsValid(false)
    }

    if (usernameValidator.test(value)) {
      setFormValue(value)
      setIsLoading(true)
      setIsValid(false)
    }
  }

  // Check username 800ms after last event if no event since
  // (when user hasn't typed from 800ms)
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length < 3) return
      const ref = firestore.doc(`usernames/${username}`)
      const { exists } = await ref.get()

      console.log('Firestore read executed!')

      setIsValid(!exists)
      setIsLoading(false)
    }, 800),
    []
  )

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  return (
    <>
      <h1>Choisissez votre nom d'utilisateur</h1>
      <form onSubmit={onSubmit}>
        <UsernameMessage
          username={formValue}
          isValid={isValid}
          isLoading={isLoading}
        />
        <input
          type="text"
          name="username"
          placeholder="Mon nom"
          onChange={onChange}
          value={formValue}
        />

        <button type="submit" className="btn-green" disabled={!isValid}>
          Choisir
        </button>
      </form>
    </>
  )
}

const UsernameMessage: React.FC<UsernameMessageProps> = ({
  username,
  isValid,
  isLoading,
}) => {
  if (isLoading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>
  } else {
    return <p></p>
  }
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
