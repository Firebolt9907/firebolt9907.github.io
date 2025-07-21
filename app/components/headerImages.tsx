import { useState, type FC } from 'react'
import { motion } from 'framer-motion'
import isMobile from './scripts/isMobile'

interface HeaderImagesProps {
  hovered: boolean
  setHovered: (b: boolean) => void
}

const HeaderImages: FC<HeaderImagesProps> = ({ hovered, setHovered }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  function handleMouseMove (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const relativeX = e.clientX - centerX
    const relativeY = e.clientY - centerY
    setCursorPosition({ x: relativeX, y: relativeY })
  }

  return (
    <section
      id='img-section'
      className='pt-24 text-center flex justify-center'
      style={{ margin: '7vw 0vw', marginTop: 'calc(5vw + 20px)' }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          marginRight: '0vw',
          marginLeft: '-40vw'
        }}
        animate={{
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.8,
          marginRight: '0vw'
        }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        className='hidden md:inline-block w-1/4 h-25vw rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
      >
        <img
          className='h-full w-full object-cover rounded-full'
          src='https://avatars.githubusercontent.com/u/83421723?v=4'
          alt='My Github Profile Picture'
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0.5,
          x: 0,
          borderRadius: '2vw',
          height: '25vw',
          width: '17.5vw',
          zIndex: 60,
          marginLeft: '-25vw',
          marginRight: '-25vw',
          scale: 0.5
        }}
        animate={{
          rotateZ: [360, 0],
          borderRadius: '2vw',
          height: isMobile() ? '67vw' : '25vw',
          width: isMobile() ? '50vw' : '17.5vw',
          scale: 1.5,
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 0.6
          },
          marginLeft: '-18vw',
          marginRight: '-18vw',
          marginTop: isMobile() ? '15vw' : '0vw'
        }}
        whileHover={
          !isMobile()
            ? {
                // rotateZ: [0, 360],
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
              }
            : undefined
        }
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className='rounded-full overflow-hidden shadow-lg hover:shadow-4xl transition-shadow duration-300'
      >
        <motion.img
          className='centered h-full w-full object-cover'
          src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/professionalpfp.webp?raw=true'
          alt='My Professional Headshot'
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, marginRight: '-40vw' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className='hidden md:inline-block w-1/4 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300'
      >
        <img
          className='h-full w-full object-cover rounded-full'
          src='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/goofypfp.webp?raw=true'
          alt='My Social Media Profile Picture'
        />
      </motion.div>
    </section>
  )
}

export default HeaderImages
