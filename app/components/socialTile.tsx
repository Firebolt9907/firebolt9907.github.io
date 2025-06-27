import { motion } from 'framer-motion'
import { useState, useEffect, type FC } from 'react'

interface SocialTileProps {
  platform: string
  url: string
  pfpSrc: string
  platformSrc: string
}

const layoutTransition = {
  type: 'spring',
  stiffness: 150,
  damping: 15
} as const

const SocialTile: FC<SocialTileProps> = ({
  platform,
  url,
  pfpSrc,
  platformSrc
}) => {
  const [stateOpen, setOpen] = useState(false)
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
    <motion.div
      layoutId={platform}
      transition={layoutTransition}
      className='card cursor-pointer p-2'
      onClick={() => window.open(url, '_blank')}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        whileHover={{
          scale: 1.0,
          rotateX: -cursorPosition.y / 7,
          rotateY: cursorPosition.x / 10,
          perspective: '100px',
          boxShadow: `${cursorPosition.x / -10}px ${
            cursorPosition.y / -7
          }px 20px rgba(0, 0, 0, 0.3)`,
          transition: { duration: 0 }
        }}
        whileTap={{
          scale: 0.95,
          rotateX: 0,
          rotateY: 0,
          perspective: '0px',
          transition: { duration: 0.3 }
        }}
        animate={{
          rotateX: 0,
          rotateY: 0,
          perspective: '0px',
          boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.3)`,
          transition: { duration: 0.3 }
        }}
        style={{
          boxShadow: `${cursorPosition.x / -10}px ${
            cursorPosition.y / -7
          }px 20px rgba(0, 0, 0, 0.3)`
        }}
        onHoverEnd={() => {
          setCursorPosition({ x: 0, y: 0 })
        }}
        transition={{ duration: 0 }}
        className='w-full h-full max-w-sm mx-auto text-gray-900 dark:text-white'
      >
        <motion.div
          className='p-4 rounded-lg shadow bg-gray-100 dark:bg-gray-900 h-full flex flex-col justify-start project-tile'
          layoutId={`card-${platform}`}
          animate={{ borderRadius: '5px', backgroundColor: 'rgb(32,32,32)' }}
          style={{
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.img
            layoutId={`platformimg-${platform}`}
            className='mx-auto h-24 mb-4 object-contain'
            src={platformSrc}
            alt={platform}
            style={{ borderRadius: '15%', filter: 'brightness(0) invert(1)' }}
          />
          <motion.h2
            layoutId={`platform-${platform}`}
            className='text-xl font-bold text-center'
          >
            {platform}
          </motion.h2>
          <motion.h3
            layoutId={`username-${platform}`}
            className='text-m text-gray-500 dark:text-gray-400 mb-2 text-center'
          >
            @Firebolt9907
          </motion.h3>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SocialTile
