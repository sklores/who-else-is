import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import PostCard from './components/PostCard'
import type { Post } from './components/PostCard'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onCreate: () => void
  onFocus: () => void
  onBlur: () => void
}

type FeedProps = {
  posts: Post[]
}

const userPostStorageKey = 'who-else-be-user-posts'

const starterPhrases = [
  'working on a budget',
  'working on a calendar',
  'working on a draft',
  'working on a report',
  'working on a checklist',
  'working on a presentation',
  'working on a cover letter',
  'working on a resume',
  'working on a spreadsheet',
  'working on a proposal',
  'working on an email',
  'working on a message',
  'working on a plan',
  'working on a to do list',
  'working on a schedule',
  'working on a project update',
  'working on a homework assignment',
  'working on a side project',
  'trying to finish a draft',
  'trying to finish a report',
  'trying to finish a spreadsheet',
  'trying to finish a presentation',
  'trying to clean up notes',
  'trying to organize files',
  'trying to focus on reading',
  'trying to focus on writing',
  'trying to start a routine',
  'trying to start a workout',
  'trying to start a new habit',
  'trying to make a plan',
  'sitting at my desk',
  'sitting on the couch',
  'sitting in the car',
  'sitting in my room',
  'sitting in the kitchen',
  'sitting at the dining table',
  'sitting by the window',
  'sitting in a quiet corner',
  'lying in bed scrolling',
  'lying in bed re reading messages',
  'lying in bed with the lights off',
  'lying in bed overthinking',
  'scrolling through emails',
  'scrolling through news',
  'scrolling through notes',
  'scrolling through messages',
  'avoiding a phone call',
  'avoiding a long message',
  'avoiding a meeting agenda',
  'avoiding a task list',
  'waiting for a reply',
  'waiting for an update',
  'waiting for a delivery',
  'waiting for a reminder',
  'thinking about a decision',
  'thinking about next week',
  'thinking about a conversation',
  'thinking about a to do list',
  'procrastinating on a chore',
  'procrastinating on a report',
  'getting ready for the day',
  'getting ready for tomorrow',
  'getting ready for a meeting',
  'putting off laundry',
  'putting off dishes',
  'staring at a blank page',
  'staring at my screen',
  'dealing with a backlog',
  'dealing with a slow morning',
  'planning the week',
  'planning a grocery run',
  'finishing a draft',
  'finishing a checklist',
  'finishing a report',
  'half doing a cleanup',
  'redoing a paragraph',
  'redoing a budget',
  'organizing my desk',
  'organizing a folder',
  'cleaning the kitchen',
  'cleaning the living room',
  'fixing a typo',
  'fixing a spreadsheet',
  'reading a chapter',
  'reading a long email',
  'watching a tutorial',
  'watching a show',
  'listening to a podcast',
  'listening to music',
  'writing a note',
  'writing a message',
  'rewriting a paragraph',
  'starting a new document',
  'not starting the task yet',
  'pretending to be busy',
  'figuring out a plan',
  'deciding whether to respond',
  'wondering if i should rest',
  'getting through the afternoon',
  'getting distracted by notifications',
]

const locationContexts = [
  'at my desk',
  'on the couch',
  'in my room',
  'in the kitchen',
  'at the dining table',
  'by the window',
  'in a quiet corner',
  'at the coffee table',
  'on the floor',
  'in the car',
]

const timeContexts = [
  'this morning',
  'late at night',
  'earlier today',
  'this afternoon',
  'tonight',
  'before lunch',
  'after dinner',
  'on a weekday',
  'on a saturday',
  'on a sunday',
]

const emotionContexts = [
  'and feeling stuck',
  'and feeling tired',
  'and feeling restless',
  'without much motivation',
  'and feeling unfocused',
  'and feeling calm',
  'and feeling overwhelmed',
  'and feeling bored',
  'and feeling quiet',
  'with low energy',
]

const displayTimes = [
  'just now',
  '5m ago',
  '12m ago',
  '25m ago',
  'earlier today',
  'this morning',
  'last night',
  'yesterday',
  'a few minutes ago',
  'this afternoon',
]

const displayNames = [
  'Avery',
  'Jordan',
  'Riley',
  'Casey',
  'Morgan',
  'Taylor',
  'Quinn',
  'Parker',
  'Reese',
  'Rowan',
  'Emery',
  'Skyler',
  'Drew',
  'Blake',
  'Hayden',
  'Cameron',
  'Finley',
  'Logan',
  'Sidney',
  'Marley',
  'Dakota',
  'Harper',
  'Sage',
  'River',
  'Mason',
  'Ari',
  'Jamie',
  'Kendall',
  'Lane',
  'Elliot',
]

const starterGroups = [
  {
    starter: 'eating',
    objects: ['toast', 'leftovers', 'a snack', 'cereal', 'noodles', 'a sandwich'],
    useLocation: true,
  },
  {
    starter: 'dancing',
    objects: ['in the kitchen', 'around my room', 'to whatever is playing'],
    useLocation: false,
  },
  {
    starter: 'wearing',
    objects: ['the same hoodie', 'sweatpants', 'a work shirt', 'something comfy'],
    useLocation: true,
  },
  {
    starter: 'driving',
    objects: ['home', 'to the store', 'without a plan', 'around the block'],
    useLocation: false,
  },
  {
    starter: 'going to',
    objects: ['the store', 'pick up groceries', 'run errands', 'grab coffee'],
    useLocation: false,
  },
  {
    starter: 'hunting',
    objects: ['for an idea', 'for motivation', 'for my keys', 'for a charger'],
    useLocation: true,
  },
  {
    starter: 'singing',
    objects: [
      'quietly',
      'to myself',
      'while doing chores',
      'absentmindedly',
    ],
    useLocation: true,
  },
  {
    starter: 'making',
    objects: [
      'a small list',
      'progress on a task',
      'a mess',
      'something i do not fully understand',
    ],
    useLocation: true,
  },
  {
    starter: 'cooking',
    objects: [
      'something simple',
      'dinner for one',
      'a basic meal',
      'without much motivation',
    ],
    useLocation: false,
  },
]

const seededValue = (index: number) => {
  const value = Math.sin(index * 138.73) * 10000
  return value - Math.floor(value)
}

const iamCountFromSeed = (index: number) => {
  const value = seededValue(index)
  if (value < 0.6) {
    return Math.floor(value * 6)
  }
  if (value < 0.9) {
    return 10 + Math.floor(((value - 0.6) / 0.3) * 41)
  }
  return 80 + Math.floor(((value - 0.9) / 0.1) * 71)
}

const generateFakePosts = (): Post[] => {
  const posts: Post[] = []
  let postIndex = 0

  starterPhrases.forEach((starter, starterIndex) => {
    for (let variation = 0; variation < 3; variation += 1) {
      const location = locationContexts[(starterIndex + variation) % locationContexts.length]
      const time = timeContexts[(starterIndex * 3 + variation) % timeContexts.length]
      const emotion = emotionContexts[(starterIndex * 5 + variation) % emotionContexts.length]
      posts.push({
        id: `fake-${postIndex}`,
        name: displayNames[postIndex % displayNames.length],
        text: `${starter} ${location} ${time} ${emotion}`,
        time: displayTimes[postIndex % displayTimes.length],
        iamCount: iamCountFromSeed(postIndex),
        createdAt: 0,
      })
      postIndex += 1
    }
  })

  starterGroups.forEach((group, groupIndex) => {
    for (let variation = 0; variation < 20; variation += 1) {
      const object = group.objects[variation % group.objects.length]
      const location = group.useLocation
        ? locationContexts[(groupIndex + variation) % locationContexts.length]
        : ''
      const time = timeContexts[(groupIndex * 4 + variation) % timeContexts.length]
      const emotion = emotionContexts[(groupIndex * 6 + variation) % emotionContexts.length]
      posts.push({
        id: `fake-${postIndex}`,
        name: displayNames[postIndex % displayNames.length],
        text: `${group.starter} ${object} ${location} ${time} ${emotion}`
          .replace(/\s+/g, ' ')
          .trim(),
        time: displayTimes[postIndex % displayTimes.length],
        iamCount: iamCountFromSeed(postIndex),
        createdAt: 0,
      })
      postIndex += 1
    }
  })

  return posts
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const loadUserPosts = (): Post[] => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const stored = localStorage.getItem(userPostStorageKey)
    if (!stored) {
      return []
    }
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .filter((item) => isRecord(item) && typeof item.text === 'string')
      .map((item) => ({
        id: typeof item.id === 'string' ? item.id : String(Date.now()),
        name: typeof item.name === 'string' ? item.name : 'You',
        text: item.text,
        time: typeof item.time === 'string' ? item.time : 'just now',
        iamCount: typeof item.iamCount === 'number' ? item.iamCount : 1,
        createdAt:
          typeof item.createdAt === 'number' ? item.createdAt : Date.now(),
        isUser: true,
      }))
  } catch {
    return []
  }
}

function SearchBar({ value, onChange, onCreate, onFocus, onBlur }: SearchBarProps) {
  return (
    <div>
      <div className="composer-row">
        <input
          id="search"
          type="search"
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          placeholder="who else be…"
        />
        {value.trim() ? (
          <button type="button" className="composer-button" onClick={onCreate}>
            I be
          </button>
        ) : null}
      </div>
    </div>
  )
}

function Feed({ posts }: FeedProps) {
  return (
    <div>
      {posts.slice(0, 8).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [viewStyle, setViewStyle] = useState('whoelseis')
  const fakePosts = useMemo(() => generateFakePosts(), [])
  const [posts, setPosts] = useState<Post[]>(() => [
    ...loadUserPosts(),
    ...fakePosts,
  ])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [background, setBackground] = useState('Sand')
  const bumpIntervalIndex = useRef(0)
  const bumpTimeoutId = useRef<number | null>(null)
  const bumpCursor = useRef(0)

  useEffect(() => {
    if (viewStyle !== 'whoelseis') {
      setBackground('Sand')
    }
  }, [viewStyle])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const userPosts = posts.filter((post) => post.isUser)
    localStorage.setItem(userPostStorageKey, JSON.stringify(userPosts))
  }, [posts])

  useEffect(() => {
    const sequence = [7000, 28000, 3000, 9000, 18000, 11000]

    if (isSearchFocused || query.trim()) {
      if (bumpTimeoutId.current !== null) {
        window.clearTimeout(bumpTimeoutId.current)
        bumpTimeoutId.current = null
      }
      return
    }

    const scheduleNext = () => {
      const delay = sequence[bumpIntervalIndex.current % sequence.length]
      bumpTimeoutId.current = window.setTimeout(() => {
        setPosts((prevPosts) => {
          const userPosts = prevPosts.filter((post) => post.isUser)
          const fakePosts = prevPosts.filter((post) => !post.isUser)
          if (fakePosts.length === 0) {
            return prevPosts
          }
          const targetIndex = bumpCursor.current % fakePosts.length
          bumpCursor.current += 1
          const targetPost = fakePosts[targetIndex]
          const updatedPost = {
            ...targetPost,
            time: 'just now',
            createdAt: Date.now(),
          }
          return [
            ...userPosts,
            updatedPost,
            ...fakePosts.slice(0, targetIndex),
            ...fakePosts.slice(targetIndex + 1),
          ]
        })
        bumpIntervalIndex.current += 1
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      if (bumpTimeoutId.current !== null) {
        window.clearTimeout(bumpTimeoutId.current)
        bumpTimeoutId.current = null
      }
    }
  }, [isSearchFocused, query])

  const handleCreatePost = () => {
    const trimmed = query.trim()
    if (!trimmed) {
      return
    }

    const newPost: Post = {
      id: String(Date.now()),
      name: 'You',
      text: trimmed,
      time: 'just now',
      iamCount: 1,
      createdAt: Date.now(),
      isUser: true,
    }

    setPosts((prevPosts) => [newPost, ...prevPosts])
    setQuery('')
  }

  const filteredPosts = query
    ? posts.filter((post) =>
        post.text.toLowerCase().includes(query.toLowerCase())
      )
    : [...posts].sort((a, b) => {
        if (a.isUser && !b.isUser) {
          return -1
        }
        if (!a.isUser && b.isUser) {
          return 1
        }
        const recencyDifference = (b.createdAt ?? 0) - (a.createdAt ?? 0)
        if (recencyDifference !== 0) {
          return recencyDifference
        }

        return b.iamCount - a.iamCount
      })

  const backgroundClass =
    viewStyle === 'whoelseis'
      ? `bg-${background.toLowerCase().replace(/\\s+/g, '-')}`
      : ''

  return (
    <div className={`style-${viewStyle} ${backgroundClass}`.trim()}>
      <main>
        <header className="site-header">
          <h1>Who Else Be?</h1>
          <div className="search-panel">
          <SearchBar
            value={query}
            onChange={setQuery}
            onCreate={handleCreatePost}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          </div>
        </header>
        <Feed posts={filteredPosts} />
        <div className="view-selector">
          <select
            value={viewStyle}
            onChange={(event) => setViewStyle(event.target.value)}
          >
            <option value="whoelseis">Who Else Be</option>
            <option value="myspace">MySpace</option>
            <option value="facebook">Facebook</option>
            <option value="reddit">Reddit</option>
            <option value="princess">Princess</option>
          </select>
        </div>
        {viewStyle === 'whoelseis' ? (
          <div className="background-controls">
            <label>
              Background
              <select
                value={background}
                onChange={(event) => setBackground(event.target.value)}
              >
                <option value="Sand">Sand</option>
                <option value="Sage">Sage</option>
                <option value="Cloud">Cloud</option>
                <option value="Blush">Blush</option>
                <option value="Charcoal">Charcoal</option>
                <option value="Taupe">Taupe</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
                <option value="Zebra">Zebra</option>
              </select>
            </label>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default App
