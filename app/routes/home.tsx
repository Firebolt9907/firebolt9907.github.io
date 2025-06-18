import { useState } from 'react'
import type { Route } from './+types/home'
import HeaderImages from '~/components/headerImages'
import ProjectsSection from '~/components/projectsSection'
import NavBar from '~/components/navBar'
import GraphsSection from '~/components/graphs'
import SocialSection from '~/components/socialSection'
import Header from '~/components/header'

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

      <Header />

      <GraphsSection />

      <ProjectsSection />

      <SocialSection />
    </div>
  )
}
