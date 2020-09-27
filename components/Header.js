import Link from 'next/link'
import {AiOutlineThunderbolt} from 'react-icons/ai'

export default function Header() {
  return (
    <div className="py-3 px-2 md:px-8 xl:px-12">
      <header className="flex items-center justify-between ">
        <div>
          <Link href="/">
            <a className=" text-lg font-normal tracking-tighter ">
            <h1 className="flex p-1 px-2 leading-none text-3xl text-white bg-black font-bold tracking-tighter">signalsovertheair</h1>
            </a>

            {/* <a className="text-black">
              <AiOutlineThunderbolt size={35} />
            </a> */}
          </Link>
        </div>
        <nav className="text-sm ">
          <Link href="/">
            <a className="mr-8 font-medium">Blog</a>
          </Link>
          <Link href="/about">
            <a className=" font-medium">About</a>
          </Link>
        </nav>
      </header>
    </div>
  )
}
