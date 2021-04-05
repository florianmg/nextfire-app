import React from 'react'

import { getUserWithUsername, postsToJSON } from '../../lib/firebase'

import PostsFeed from '../../components/PostFeed'
import UserProfile from '../../components/UserProfile'

import { User } from '../../types/User.types'
import { Post } from '../../types/posts.types'

type UserProfilePageProps = {
  user: User
  posts: Post[]
}

export async function getServerSideProps({ query }) {
  const { username } = query

  const userDoc = await getUserWithUsername(username)
  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)

    posts = (await postsQuery.get()).docs.map(postsToJSON)
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  }
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, posts }) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostsFeed posts={posts} />
    </main>
  )
}

export default UserProfilePage
