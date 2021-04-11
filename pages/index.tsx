import React, { useState } from 'react'

import PostFeed from '../components/PostFeed'
import Loader from '../components/Loader'

import { firestore, fromMillis, postsToJSON } from '../lib/firebase'

import { Post } from '../types/posts.types'

const MAX_POSTS_PER_QUERY = 1

type HomeProps = {
  posts: Post[]
}

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(MAX_POSTS_PER_QUERY)

  const posts = (await postsQuery.get()).docs.map(postsToJSON)

  // props passed to the component
  return {
    props: { posts },
  }
}

const Home: React.FC<HomeProps> = ({ posts }) => {
  const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPostsEnd, setIsPostsEnd] = useState<boolean>(false)

  const getMorePosts = async () => {
    setIsLoading(true)
    const lastLoadedPost = loadedPosts[loadedPosts.length - 1]
    const cursor =
      typeof lastLoadedPost.createdAt === 'number'
        ? fromMillis(lastLoadedPost.createdAt)
        : lastLoadedPost.createdAt

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(MAX_POSTS_PER_QUERY)

    const newPosts = (await query.get()).docs.map(postsToJSON)

    setLoadedPosts(loadedPosts.concat(newPosts))
    setIsLoading(false)

    if (newPosts.length < MAX_POSTS_PER_QUERY) {
      setIsPostsEnd(true)
    }
  }
  return (
    <main>
      <PostFeed posts={loadedPosts} />
      {!isLoading && !isPostsEnd && (
        <button onClick={getMorePosts}>Voir plus</button>
      )}
      <Loader show={isLoading} />
      {isPostsEnd && <p>Désolé mais vous avez tout lue !</p>}
    </main>
  )
}

export default Home
