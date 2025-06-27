import React from 'react'
import SocialTile from './socialTile'

const SocialSection: React.FC = () => {
  return (
    <section id='social' className='py-16'>
      <h2 className='text-4xl font-semibold mb-8 text-center'>Socials</h2>
      <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 px-6'>
        <SocialTile
          platform='Github'
          platformSrc='https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/main/assets/githublogo.svg'
          pfpSrc='https://avatars.githubusercontent.com/u/83421723?v=4'
          url='https://github.com/Firebolt9907'
        ></SocialTile>
        <SocialTile
          platform='Linkedin'
          platformSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/linkedin.png?raw=true'
          url='https://www.linkedin.com/in/rishit-sharma-2a7904299/'
          pfpSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true'
        ></SocialTile>
      </div>
    </section>
  )
}

export default SocialSection
