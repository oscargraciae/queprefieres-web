import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React, { Fragment } from 'react'

interface HeaderUserMenuProps {
  name: string
  email: string
  image: string
}

export const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ name, image, email }) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-60">
      <div>
        <Menu.Button className="flex flex-row items-center justify-between space-x-2">
          <Image alt={name} className="w-10 h-10 rounded-full shadow-xl" src={image} width={42} height={42} />
          {/* <span>{label}</span> */}
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-30 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <div className='flex flex-col p-2 space-y-1'>
                <span>{name}</span>
                <span className='text-sm text-gray-500'>{email}</span>
              </div>
            </Menu.Item>
                
                  
          </div>
          {/* <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Duplicate
                </button>
              )}
            </Menu.Item>
          </div> */}
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-indigo-500 text-white' : 'text-gray-400'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Salir
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}