import { motion } from 'motion/react'
import React, { useState } from 'react'

interface ShimmerButtonProps {
  content: React.ReactNode
  title?: string
  handleClick: React.MouseEventHandler<HTMLDivElement>
  tile?: boolean
  background?: string
  backgroundHovered?: string
  loadingIndex?: number
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  content,
  title = undefined,
  handleClick,
  tile = false,
  background = 'rgb(32,32,32)',
  backgroundHovered = 'rgb(55,55,55)',
  loadingIndex = 0
}) => {
  const angleModifier = 15
  const translateModifier = 12
  const shadowPositionModifier = -15
  const parallaxAngleModifier = 0.7
  const parallaxTranslateModifier = 0.7
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
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.2
      }}
    >
      {/* Hover detection wrapper with padding to prevent jitter */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          padding: '20px',
          margin: '-20px'
        }}
      >
        <motion.div
          whileHover={{
            scale: tile ? 1.1 : 1.3,
            rotateX: cursorPosition.yStandard * angleModifier,
            rotateY: -cursorPosition.xStandard * angleModifier,
            x: cursorPosition.xStandard * translateModifier,
            y: cursorPosition.yStandard * translateModifier,
            perspective: '100px',
            boxShadow: `${
              cursorPosition.xStandard * shadowPositionModifier
            }px ${
              cursorPosition.yStandard * shadowPositionModifier
            }px 20px rgba(0, 0, 0, 0.4)`,
            transition: { duration: 0 },
            borderRadius: tile ? '20px' : '200px',
            zIndex: 9999999
          }}
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
            borderRadius: tile ? '5px' : '200px',
            scale: 1,
            zIndex: 1
          }}
          onHoverEnd={() => {
            setCursorPosition({ x: 0, y: 0, xStandard: 0, yStandard: 0 })
          }}
          transition={{ duration: 0 }}
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            isolation: 'isolate'
          }}
          className='w-full h-full mx-auto text-gray-900 dark:text-white overflow-visible cursor-pointer'
        >
          <motion.div
            className='p-4 shadow h-full flex flex-col justify-start'
            layoutId={`card-${title}`}
            animate={{
              borderRadius: tile ? '5px' : '200px',
              backgroundColor: background,
              clipPath: 'inset(0 round 5px)'
            }}
            whileHover={{
              borderRadius: tile ? '20px' : '200px',
              backgroundColor: backgroundHovered,
              clipPath: `inset(0 round ${tile ? '20px' : '200px'})`
            }}
            style={{
              overflow: 'hidden',
              position: 'relative',
              border: tile ? `2px solid ${backgroundHovered}` : '',
              borderRadius: tile ? '5px' : '200px',
              transform: 'preserve-3d'
            }}
          >
            <motion.div
              animate={{
                rotateY:
                  cursorPosition.xStandard *
                  angleModifier *
                  parallaxAngleModifier,
                rotateX:
                  cursorPosition.yStandard *
                  angleModifier *
                  parallaxAngleModifier,
                x:
                  -cursorPosition.xStandard *
                  translateModifier *
                  parallaxTranslateModifier,
                y:
                  -cursorPosition.yStandard *
                  translateModifier *
                  parallaxTranslateModifier
              }}
              transition={{ duration: 0 }}
            >
              <motion.div
                animate={{
                  scale: hovered ? 1 : 0.9
                }}
                transition={{ duration: 0.3 }}
              >
                {content || <p>No Content</p>}
              </motion.div>
            </motion.div>
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
    </motion.div>
  )
}

export default ShimmerButton
