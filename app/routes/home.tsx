import { useState } from 'react'
import type { Route } from './+types/home'
import { motion } from 'framer-motion'
import ProjectTile from '../projectTile/projectTile'

export function meta ({}: Route.MetaArgs) {
  return [
    { title: 'Rishit Sharma' },
    { name: 'description', content: "Rishit Sharma's Portfolio Page" }
  ]
}

export default function Home () {
  const [imgSectionHoverState, setImgSectionState] = useState(false)

  return (
    <div className='bg-white dark:bg-gray-950 text-gray-900 dark:text-white scroll-smooth'>
      <header className='fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6'>
        <img
          className='h-12'
          src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/signature.png?raw=true'
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

      <section
        id='img-section'
        className='pt-24 text-center flex justify-center'
        style={{ margin: '7vw 0vw' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, marginRight: '0vw' }}
          animate={{
            opacity: imgSectionHoverState ? 1 : 0,
            scale: imgSectionHoverState ? 1 : 0.8,
            marginRight: '0vw'
          }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          className='w-1/4 h-25vw rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
        >
          <img
            className='h-full w-full object-cover rounded-full'
            src='https://avatars.githubusercontent.com/u/83421723?v=4'
            alt='My Github Profile Picture'
          />
        </motion.div>
        <motion.div
          initial={{
            opacity: 1,
            x: 0,
            borderRadius: '2vw',
            height: '25vw',
            width: '17.5vw',
            zIndex: 10000,
            marginLeft: '-25vw',
            marginRight: '-25vw',
            scale: 1.5
          }}
          animate={{
            rotateZ: imgSectionHoverState ? [360, 0] : [360, 0],
            borderRadius: imgSectionHoverState ? '22vw' : '2vw',
            height: '25vw',
            width: imgSectionHoverState ? '25vw' : '17.5vw',
            scale: imgSectionHoverState ? 1.8 : 1.5,
            transition: {
              type: 'spring',
              bounce: 0.6,
              duration: imgSectionHoverState ? 0.8 : 0.6,
              ease: 'easeInOut'
            },
            marginLeft: imgSectionHoverState ? '5vw' : '-18vw',
            marginRight: imgSectionHoverState ? '5vw' : '-18vw'
          }}
          whileHover={{
            rotateZ: [0, 360],
            borderRadius: '22vw',
            height: '25vw',
            width: '25vw',
            scale: 1.8,
            transition: {
              type: 'spring',
              bounce: 0.6,
              duration: 0.8,
              ease: 'easeInOut'
            },
            marginLeft: '5vw',
            marginRight: '5vw'
          }}
          onHoverStart={() => setImgSectionState(true)}
          onHoverEnd={() => setImgSectionState(false)}
          className='inline-block w-1/4 h-25vw  rounded-full overflow-hidden shadow-lg hover:shadow-4xl transition-shadow duration-300'
        >
          <img
            className='centered h-full w-full object-cover'
            src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true'
            alt='My Professional Headshot'
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imgSectionHoverState ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className='inline-block w-1/4 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
        >
          <img
            className='inline-block'
            src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/goofypfp.jpg?raw=true'
            alt='My Social Media Profile Picture'
          />
        </motion.div>
      </section>

      <section id='welcome-section' className='snap-start py-16 text-center'>
        <motion.div
          onHoverStart={() => setImgSectionState(true)}
          onHoverEnd={() => setImgSectionState(false)}
        >
          <h1 className='text-6xl font-bold mb-2'>Rishu Sharma</h1>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0.5,
            transition: { duration: 0.3 }
          }}
          animate={{
            opacity: imgSectionHoverState ? 1 : 0.5,
            transition: { duration: 0.3 }
          }}
        >
          <h2 className='text-2xl mb-4'>Aspiring Software Developer</h2>
        </motion.div>
        {/* <h2 className="text-2xl">Incoming Freshman in CS</h2> */}
      </section>

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

      <section id='projects' className='snap-start py-16 bg-gray-100'>
        <h2 className='text-4xl font-semibold mb-8 text-center'>Projects</h2>
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6'>
          <ProjectTile
            url="https://github.com/Firebolt9907/weatherML"
            title="WeatherML"
            year="2024"
            technology="Python/Pytorch"
            description="Pytorch ML model created to predict the weather in Clive, IA"
            imageSrc="https://static-00.iconduck.com/assets.00/pytorch-icon-1694x2048-jgwjy3ne.png"
          />
          <ProjectTile
            url="https://github.com/metallum-ultorum/IntoTheDeep"
            title="MU FTC Robot Code"
            year="2024-25"
            technology="Java"
            description="Code for Metallum Ultorum Robot using Java OOP"
            imageSrc="https://cdn.freebiesupply.com/logos/large/2x/java-logo-svg-vector.svg"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/Zpp"
            title="Zpp"
            year="2022"
            technology="Flutter"
            description="First app made to solve many small problems in daily life"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/Stock-App"
            title="Stocks"
            year="2023"
            technology="Flutter"
            description="Stocks app made for clean UI and simplicity in mind"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/firebolt9907.github.io"
            title="This Website"
            year="2025"
            technology="HTML/CSS/JS"
            description="Stocks app made for clean UI and simplicity in mind"
            imageSrc="https://imakestuff.online/wp-content/uploads/2019/12/HTML-CSS-JS-Logo.png"
          />
          <ProjectTile
            url="https://github.com/Deus-Ex-Machina-38433/DEM-RC-Master"
            title="DEM FTC Robot Code"
            year="2021-23"
            technology="Java"
            description="Code for Deus Ex Machina Robot using Java OOP"
            imageSrc="https://cdn.freebiesupply.com/logos/large/2x/java-logo-svg-vector.svg"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/ultimate-tag-flutter"
            title="Ultimate Tag"
            year="2022-23"
            technology="Flutter"
            description="Multiplayer Game with entirely custom UI for classmates"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/spotify_view"
            title="Spotify View"
            year="2023"
            technology="Flutter"
            description="App created to turn my phone into a Car Thing with lyrics"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/praaccc"
            title="Praaccc"
            year="2023"
            technology="Flutter"
            description="App created to allow people on my swim team to rate workouts"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
          <ProjectTile
            url="https://github.com/Firebolt9907/gradeManipulator"
            title="Grade Manipulator"
            year="2024"
            technology="Flutter"
            description="App created to calculate grades with weighted sections"
            imageSrc="https://img.icons8.com/color/512/flutter.png"
          />
        </div>
      </section>

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
    </div>
  )
}
