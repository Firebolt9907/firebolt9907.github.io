import React from 'react'
import ShimmerButton from './subcomponents/shimmerTile'

const NavBar: React.FC = () => {
  return (
    <header className='fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6'>
      <img
        className='h-12'
        src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/signature.webp?raw=true'
        alt='My Signature'
        onClick={() => {
          window.location.href = ''
        }}
      />
      <nav className='flex row'>
        <ShimmerButton
          content={<h3>Projects</h3>}
          tile={false}
          handleClick={() => {
            window.location.href = '#projects'
          }}
        />
        <ShimmerButton
          content={<h3>Contact</h3>}
          tile={false}
          handleClick={() => {
            window.location.href = '#contact'
          }}
        />
      </nav>
    </header>
  )
}

export default NavBar
