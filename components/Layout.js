import Head from 'next/head'
import Header from './Header'
import { TiSocialTwitterCircular, TiSocialGithubCircular } from 'react-icons/ti'

export default function Layout({tag, children, pageTitle, ...props}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
      </Head>
      <section className="">
        <Header />
        <div className="bg-main-gray child py-8 px-2 md:px-8 xl:px-12">
          {children}
        </div>
      </section>

      {/* <footer className="flex flex-col justify-center bg-dark-gray font-light text-sm text-light-gray p-8 ">
        <div className="self-center">
          <p className="text-md font-medium ">Topics</p>
        </div>
        <div className="self-center md:w-1/3 flex flex-wrap justify-center text-center ">
          {tag.map(each => {
            return (
              <div className="mx-2 my-2 cursor-pointer">
                <p className="p-2 text-lg hover:text-white inline-block text-light-gray font-medium uppercase">{each}</p>
              </div>
            )
          })}
        </div>
      </footer> */}

      <div className=" bg-black font-medium text-xs y text-center py-4 px-8">
        {/* unfazed 2020 */}
        <div className="flex justify-center mb-2">
            <a href="https://www.twitter.com/azrvlaziz" target="_blank" rel="noopener noreferrer">
              <TiSocialTwitterCircular size={40} className="text-light-gray hover:text-white text-md"/>
            </a>
            <a href="https://github.com/azrulaziz" target="_blank" rel="noopener noreferrer">
              <TiSocialGithubCircular size={40} className="text-light-gray hover:text-white text-md"/>
            </a>
        </div>

        <p className="text-light-gray">2020 © signalsovertheair // published by <a href="https://twitter.com/azrvlaziz" target="_blank" className="underline">azrulaziz</a></p>

      </div>
    </>
  )
}
