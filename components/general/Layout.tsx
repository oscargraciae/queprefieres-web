import React from 'react'
import { Header } from './header/Header'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1 w-full mx-auto'>
        {children}
      </div>
    </div>
  )
}