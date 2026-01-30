import { useState } from 'react'
import './App.css'
import PostCard from './components/PostCard'
import type { Post } from './components/PostCard'

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
    time: 'just now',
    iamCount: 34,
  },
  {
    id: '2',
    name: 'Mateo',
    text: 'Deep in a customer interview about onboarding.',
    time: '5m ago',
    iamCount: 21,
  },
  {
    id: '3',
    name: 'Priya',
    text: 'Refining the release checklist before launch.',
    time: '12m ago',
    iamCount: 41,
  },
  {
    id: '4',
    name: 'Jordan',
    text: 'Watching analytics spike after the email blast.',
    time: '18m ago',
    iamCount: 18,
  },
  {
    id: '5',
    name: 'Harper',
    text: 'Drafting copy for the new community update.',
    time: '23m ago',
    iamCount: 29,
  },
  {
    id: '6',
    name: 'Sasha',
    text: 'Testing the new checkout flow in staging.',
    time: '32m ago',
    iamCount: 25,
  },
]

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="who else is…"
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
  const [viewStyle, setViewStyle] = useState('myspace')

  const filteredPosts = query
    ? posts.filter((post) =>
        post.text.toLowerCase().includes(query.toLowerCase())
      )
    : [...posts].sort((a, b) => b.iamCount - a.iamCount)

  return (
    <div className={`style-${viewStyle}`}>
      <main>
        <header className="site-header">
          <h1>Who Else Is?</h1>
          <div className="search-panel">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </header>
        <Feed posts={filteredPosts} />
        <div className="view-selector">
          <select
            value={viewStyle}
            onChange={(event) => setViewStyle(event.target.value)}
          >
            <option value="myspace">MySpace</option>
            <option value="facebook">Facebook</option>
            <option value="reddit">Reddit</option>
            <option value="princess">Princess</option>
          </select>
        </div>
      </main>
    </div>
  )
}

export default App
