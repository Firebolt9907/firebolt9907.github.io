import React from 'react';

const SocialSection: React.FC = () => {
    return (
        <section id='social' className='snap-start py-16'>
        <h2 className='text-4xl font-semibold mb-8 text-center'>Socials</h2>
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 px-6'>
          <a target='_blank' href='https://github.com/Firebolt9907'>
            <div className='flex items-center space-x-4'>
              <img
                className='h-12 w-12 rounded-full'
                src='https://avatars.githubusercontent.com/u/83421723?v=4'
                alt='My Github Profile Picture'
              />
              <div>
                <h3 className='text-lg font-bold'>@Firebolt9907</h3>
                <h4 className='text-sm text-gray-600 dark:text-gray-300'>
                  Joined April 2021
                </h4>
              </div>
            </div>
          </a>
          <a
            target='_blank'
            href='https://www.linkedin.com/in/rishit-sharma-2a7904299/'
          >
            <div className='flex items-center space-x-4'>
              <img
                className='h-12 w-12 rounded-full'
                src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true'
                alt='My Professional Headshot'
              />
              <div>
                <h3 className='text-lg font-bold'>@Firebolt9907</h3>
                <h4 className='text-sm text-gray-600 dark:text-gray-300'>
                  Joined June 2024
                </h4>
              </div>
            </div>
          </a>
        </div>
      </section>
    );
};

export default SocialSection;