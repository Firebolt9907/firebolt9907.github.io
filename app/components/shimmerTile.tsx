import { motion } from 'motion/react'
import React, { useState } from 'react'

interface ShimmerTileProps {
  content: React.ReactNode
  title: string
  handleClick: React.MouseEventHandler<HTMLDivElement>
}

const layoutTransition = {
  type: 'spring',
  stiffness: 150,
  damping: 15
} as const

const ShimmerTile: React.FC<ShimmerTileProps> = ({
  content,
  title,
  handleClick
}) => {
  const angleModifier = 15
  const translateModifier = 12
  const shadowPositionModifier = -15
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
    xStandard: 0,
    yStandard: 0
  })
  const [hovered, setHover] = useState(false)

  function handleMouseMove (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const relativeX = e.clientX - centerX
    const relativeY = e.clientY - centerY
    const relXStandardized = relativeX / (rect.width / 2)
    const relYStandardized = relativeY / (rect.height / 2)
    setCursorPosition({
      x: relativeX,
      y: relativeY,
      xStandard: relXStandardized,
      yStandard: relYStandardized
    })
  }

  return (
    <motion.div
      layoutId={title}
      transition={layoutTransition}
      className='card cursor-pointer p-2'
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        whileHover={{
          scale: 1.0,
          rotateX: cursorPosition.yStandard * angleModifier,
          rotateY: -cursorPosition.xStandard * angleModifier,
          x: cursorPosition.xStandard * translateModifier,
          y: cursorPosition.yStandard * translateModifier,
          perspective: '100px',
          boxShadow: `${cursorPosition.xStandard * shadowPositionModifier}px ${
            cursorPosition.yStandard * shadowPositionModifier
          }px 20px rgba(0, 0, 0, 0.4)`,
          transition: { duration: 0 },
          borderRadius: '20px'
          // zIndex: 200,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileTap={{
          scale: 0.95,
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          perspective: '0px',
          transition: { duration: 0.3 },
          boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.8)`
        }}
        animate={{
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          perspective: '0px',
          boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.2)`,
          transition: { duration: 0.6 },
          borderRadius: '5px'
        }}
        onHoverEnd={() => {
          setCursorPosition({ x: 0, y: 0, xStandard: 0, yStandard: 0 })
        }}
        transition={{ duration: 0 }}
        className='w-full h-full mx-auto text-gray-900 dark:text-white'
      >
        <motion.div
          className='p-4 shadow h-full flex flex-col justify-start project-tile'
          layoutId={`card-${title}`}
          animate={{
            borderRadius: '5px',
            backgroundColor: 'rgb(32,32,32)',
            clipPath: 'inset(0 round 5px)'
          }}
          whileHover={{
            borderRadius: '20px',
            backgroundColor: 'rgb(55,55,55)',
            clipPath: 'inset(0 round 20px)'
          }}
          style={{
            overflow: 'hidden'
          }}
        >
          {content || <p>No Content</p>}
          <motion.div
            animate={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              height: '60px',
              width: '60px',
              position: 'fixed',
              top: `calc(50% + ${cursorPosition.y}px - 30px)`,
              left: `calc(50% + ${cursorPosition.x}px - 30px)`,
              zIndex: 150,
              pointerEvents: 'none',
              borderRadius: '100%',
              opacity: hovered ? 1 : 0,
              filter: 'blur(50px)'
            }}
            transition={{ duration: 0 }}
          ></motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ShimmerTile
