import { useState } from 'react'
import './App.css'
import PostCard, { Post } from './components/PostCard'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

type FeedProps = {
  posts: Post[]
}

const posts: Post[] = [
  {
    id: '1',
    name: 'Nova',
    text: 'Sketching the layout for our next product page.',
    iamCount: 34,
  },
  {
    id: '2',
    name: 'Mateo',
    text: 'Deep in a customer interview about onboarding.',
    iamCount: 21,
  },
  {
    id: '3',
    name: 'Priya',
    text: 'Refining the release checklist before launch.',
    iamCount: 41,
  },
  {
    id: '4',
    name: 'Jordan',
    text: 'Watching analytics spike after the email blast.',
    iamCount: 18,
  },
  {
    id: '5',
    name: 'Harper',
    text: 'Drafting copy for the new community update.',
    iamCount: 29,
  },
  {
    id: '6',
    name: 'Sasha',
    text: 'Testing the new checkout flow in staging.',
    iamCount: 25,
  },
]

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <label htmlFor="search">Search the feed</label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by activity"
      />
    </div>
  )
}

function Feed({ posts }: FeedProps) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')

  const filteredPosts = query
    ? posts.filter((post) =>
        post.text.toLowerCase().includes(query.toLowerCase())
      )
    : [...posts].sort((a, b) => b.iamCount - a.iamCount)

  return (
    <main>
      <SearchBar value={query} onChange={setQuery} />
      <Feed posts={filteredPosts} />
    </main>
  )
}

export default App
