import Layout from '@components/Layout'
import PostList from '@components/PostList'
import matter from 'gray-matter'
import {AiOutlineThunderbolt} from 'react-icons/ai'

const Index = ({posts, tag, title, description, ...props }) => {
  console.log(tag)
  return (
    <Layout pageTitle={title} tag={tag}>
      <div className="">
        {/* <h1 className="flex p-1 px-2 mb-1 leading-none text-3xl text-white bg-black font-bold tracking-tighter">UNFAZED</h1> */}
        {/* <AiOutlineThunderbolt size={30} /> */}
        {/* <h1 className="text-2xl font-bold">unfazed.ltd</h1> */}
        {/* <h1 className="flex p-1 px-2 inline-block leading-none text-3xl text-white bg-black font-bold tracking-tighter">signalsovertheair</h1> */}
      </div>
        {/* <p className="text-lg font-normal text-dark-gray">
          {description}.
        </p> */}
        <div>
          <PostList posts={posts}/>
        </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`)

  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug
      }
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  const tag = posts.map(x => x.frontmatter.tag)
  let uniqueTags = [...new Set(tag)];

  return {
    props: {
      posts,
      title: configData.default.title,
      description: configData.default.description,
      tag: uniqueTags
    },
  }
}

