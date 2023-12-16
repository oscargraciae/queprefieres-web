import React, { useState } from "react"
import Link from "next/link"
import { LoginModal } from "../LoginModal"
import { MenuNavLink } from "./MenuNavLink"

export const HeaderMenuWithoutSession = () => {
  const [openSignup, setOpenSignup] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  return (
    <>
      <div className='space-x-6'>
        <MenuNavLink onClick={() => setOpenLogin(true)} text='Inicio de sesión' />
        <MenuNavLink onClick={() => setOpenSignup(true)} text='Crear cuenta' />
      </div>
      {/* <Signup isOpen={openSignup} onOpen={() => setOpenSignup(true)} onClose={() => setOpenSignup(!openSignup)}  /> */}
      <LoginModal isOpen={openLogin} setIsOpen={setOpenLogin} />
    </>
  )
}
