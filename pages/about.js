import Layout from '../components/Layout'
import matter from 'gray-matter'

const About = ({ tag, title, description, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} description={description} tag={tag}>
      {/* <img src="/cat.png" alt="" className="w-16 mt-4" /> */}
        <div className="py-4">
          <div className="border-b-4 border-pink-800 w-10 mb-4"></div>
          <h1 className="text-3xl mb-1 font-bold w-full md:w-4/5 md:w-3/5">
            About 
          </h1>
          <div className="w-full md:w-3/5 lg:w-3/5">
            <p className="text-gray-800 text-lg mb-2">
              A blog mostly about aws, cloud architecture and web development.
            </p>
            <p>
            {/* written by <a href="https://twitter.com/azrvlaziz" target="_blank" className="text-md text-pink-800"> Azrul Aziz </a> */}
            </p>
            
          </div>
        </div>
      </Layout>
    </>
  )
}

export default About

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
      title: configData.default.title,
      description: configData.default.description,
      tag: uniqueTags
    },
  }
}
