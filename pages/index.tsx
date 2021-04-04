import toast from 'react-hot-toast'

export default function Home() {
  return (
    <main>
      <h1>Home page</h1>
      <button onClick={() => toast.success('You did it !')}>
        Test (or toast) me
      </button>
    </main>
  )
}
