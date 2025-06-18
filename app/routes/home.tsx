import { useState } from 'react'
import type { Route } from './+types/home'
import HeaderImages from '~/components/headerImages'
import ProjectsSection from '~/components/projectsSection'
import NavBar from '~/components/navBar'
import GraphsSection from '~/components/graphs'
import SocialSection from '~/components/socialSection'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export default function Home () {
  const [hovered, setHovered] = useState(false)

  return (
    <div className='text-gray-900 dark:text-white scroll-smooth'>
      <NavBar />

      <HeaderImages hovered={hovered} setHovered={setHovered} />

      <section id='welcome-section' className='snap-start py-16 text-center'>
        <h1 className='text-6xl font-bold mb-2'>Rishu Sharma</h1>
        <h2 className='text-2xl mb-4 opacity-0 hover:opacity-100 transition-opacity'>
          Aspiring Software Developer
        </h2>
        {/* <h2 className="text-2xl">Incoming Freshman in CS</h2> */}
      </section>

      <GraphsSection />

      <ProjectsSection />

      <SocialSection />
    </div>
  )
}
