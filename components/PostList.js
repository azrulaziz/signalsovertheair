// import Link from 'next/link'
import {useRouter} from 'next/router'

export default function PostList({ posts }) {
  const router = useRouter()
  if (posts === 'undefined') return null

  return (
    <div>
      {!posts && <div>No posts!</div>}
      <div className="w-full md:w-3/5 mt-8">
        {posts &&
          posts.map((post) => {
            return (
              <div 
                key={post.slug} 
                className="my-4 py-4 cursor-pointer bord" 
                onClick={() => router.push(`/[postname]`, `/${post.slug}`)}
              >
                  <div className="border-b-4 border-pink-800 w-10 mb-4 bord-2"></div>
                  <p className="text-sm font-medium tracking-wider uppercase inline-block border-b border-black mb-4">{post.frontmatter.tag}</p>
                  <h1 className="font-bold text-2xl mb-1 bord-title">{post.frontmatter.title}</h1>
                  <p className="font-light text-gray-800 text-sm">{post.frontmatter.caption}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
