import { useState } from 'react'

type Post = {
  id: string
  name: string
  text: string
  time: string
  iamCount: number
  createdAt?: number
}

type PostCardProps = {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  const [iamCount, setIamCount] = useState(post.iamCount)
  const [hasAcknowledged, setHasAcknowledged] = useState(false)

  const handleClick = () => {
    if (hasAcknowledged) {
      return
    }

    setIamCount((count) => count + 1)
    setHasAcknowledged(true)
  }

  return (
    <article>
      <h2>{post.name}</h2>
      <p>{post.text}</p>
      <p className="post-meta">
        <span>{post.time}</span>
        <span>I also be {iamCount}</span>
      </p>
      <button
        type="button"
        onClick={handleClick}
        disabled={hasAcknowledged}
      >
        I am
      </button>
    </article>
  )
}

export default PostCard
export type { Post }
