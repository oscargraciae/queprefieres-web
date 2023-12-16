import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { SocialButton } from './SocialButton'
import { signIn } from 'next-auth/react'

interface LoginModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="flex items-center justify-between text-xl font-medium leading-6 text-gray-900">
                  <span>Inicia sesión</span>
                  <button className='p-2 rounded-full hover:bg-gray-100'><IoClose /></button>
                </Dialog.Title>
                <div className="mt-2">
                  <div className='mt-12 space-y-3'>
                    <SocialButton text='Continua con Facebook' icon={<BsFacebook color='#4267B2' />} onClick={() => signIn('google')} />
                    <SocialButton text='Continua con Google' icon={<FcGoogle />} onClick={() => signIn('google')} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}