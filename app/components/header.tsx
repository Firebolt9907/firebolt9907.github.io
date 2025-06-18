import React from 'react'

const Header: React.FC = () => {
  return (
    <section id='welcome-section' className='snap-start py-16 text-center'>
      <h1 className='text-6xl font-bold mb-2'>Rishu Sharma</h1>
      <h2 className='text-2xl mb-4 opacity-0 hover:opacity-100 transition-opacity'>
        Aspiring Software Developer
      </h2>
      {/* <h2 className="text-2xl">Incoming Freshman in CS</h2> */}
    </section>
  )
}

export default Header
