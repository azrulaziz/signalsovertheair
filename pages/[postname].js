import Link from 'next/link'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import CodeBlock from '../components/CodeBlock'
import Layout from '../components/Layout'

export default function BlogPost({ tag, siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>

  return (
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`} tag={tag}>
        {/* <Link href="/">
          <a className="">Back to post list</a>
        </Link> */}
        <article>
          <div className="border-b-4 py-10 border-black mb-10">
            <div className="flex items-center mb-4 justify-between">
              <p className="text-pink-800 text-sm font-medium tracking-wider uppercase inline-block border-b-2 border-pink-800">{frontmatter.tag}</p>
              <p className="text-dark-gray text-sm font-medium">{dayjs(frontmatter.date).format('MMMM D YYYY')}</p>
            </div>
            <h1 className="text-4xl text-gray-900 font-bold">{frontmatter.title}</h1>
            <p className="text-gray-700">{frontmatter.caption}</p>
          </div>


          <div className="md text-lg w-full md:w-4/5 lg:w-3/5">
            <ReactMarkdown className="md" source={markdownBody} renderers={{ code: CodeBlock }}/>
          </div>
        </article>
      </Layout>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params

  const content = await import(`../posts/${postname}.md`)
  const config = await import(`../siteconfig.json`)
  const data = matter(content.default)

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
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
      tag: uniqueTags
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

      return slug
    })
    return data
  })(require.context('../posts', true, /\.md$/))

  const paths = blogSlugs.map((slug) => `/${slug}`)

  return {
    paths,
    fallback: false,
  }
}
