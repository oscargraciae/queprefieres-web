import React from 'react'
import { HeaderUserMenu } from './HeaderUserMenu'

interface HeaderWithSessionProps {
  session: { id: string, name: string, email: string, image: string, score: number }
}

export const HeaderWithSession: React.FC<HeaderWithSessionProps> = ({ session }) => {
  return (
    <div className='flex flex-row items-center justify-center space-x-6'>
      <button className='px-6 py-2 text-sm text-white bg-indigo-600 border-b-4 rounded-lg border-b-indigo-900 hover:bg-indigo-700'>
        Crear pregunta
      </button>
      <HeaderUserMenu name={session.name} email={session.email} image={session.image} />
    </div>
  )
}