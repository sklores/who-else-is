import { useState } from 'react'

type Post = {
  id: string
  name: string
  text: string
  iamCount: number
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
      <p>Iam count: {iamCount}</p>
      <button
        type="button"
        onClick={handleClick}
        disabled={hasAcknowledged}
        style={{
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid currentColor',
          background: hasAcknowledged ? 'transparent' : 'currentColor',
          color: hasAcknowledged ? 'inherit' : '#fff',
          opacity: hasAcknowledged ? 0.6 : 1,
          cursor: hasAcknowledged ? 'default' : 'pointer',
        }}
      >
        I am
      </button>
    </article>
  )
}

export default PostCard
export type { Post }
