import React from 'react'

const GraphsSection: React.FC = () => {
  return (
    <section id='dev-time' className='snap-start py-16'>
      <h2 className='text-4xl font-semibold mb-8 text-center'>
        Stats From Last Week
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6'>
        <div>
          <h3 className='text-xl font-bold mb-2'>
            Time Spent Coding Last Week
          </h3>
          <h4 className='text-lg mb-4'>Total:</h4>
          <div className='flex space-x-2'>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
            <div className='bg-gray-300 dark:bg-gray-700 h-8 w-8'></div>
          </div>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>Languages Used Last Week</h3>
          <div className='bg-gray-300 dark:bg-gray-700 h-32'></div>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>
            Code Editors Used Last Week
          </h3>
          <div className='bg-gray-300 dark:bg-gray-700 h-32'></div>
        </div>
        <div>
          <h3 className='text-xl font-bold mb-2'>Computers Used Last Week</h3>
          <div className='bg-gray-300 dark:bg-gray-700 h-32'></div>
        </div>
      </div>
    </section>
  )
}

export default GraphsSection
