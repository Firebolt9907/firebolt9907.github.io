import React from 'react'

const NavBar: React.FC = () => {
  return (
    <header className='fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6'>
      <img
        className='h-12'
        src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/signature.png?raw=true'
        alt='My Signature'
      />
      <nav className='space-x-4'>
        <a
          href='#projects'
          className='text-white px-3 py-2 rounded hover:bg-gray-700'
        >
          Projects
        </a>
        <a
          href='#contact'
          className='text-white px-3 py-2 rounded hover:bg-gray-700'
        >
          Contact
        </a>
      </nav>
    </header>
  )
}

export default NavBar
