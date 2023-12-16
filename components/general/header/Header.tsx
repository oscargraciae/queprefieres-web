import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { Loading } from '../Loading'
import { HeaderMenuWithoutSession } from './HeaderWhitoutSesion'
import { HeaderWithSession } from './HeaderWithSession'

export const Header = () => {
  const { data: session, status } = useSession()
  
  const HeaderMenu = () => {
    if (status === 'loading') return <Loading />
    if (session && session.user) return <HeaderWithSession session={session.user as any} />

    return <HeaderMenuWithoutSession />
  }

  return (
    <header className='flex w-full px-6 mx-auto border-b h-[72px] bg-white'>
      <nav className='container flex items-center justify-between py-4 mx-auto'>
        <h1 className='font-bold'><Link href='/'>Que prefieres?</Link></h1>
        <HeaderMenu />
      </nav>
    </header>
  )
}