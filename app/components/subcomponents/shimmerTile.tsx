import { motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import isMobile, { widthThreshold } from '../scripts/isMobile'

interface ShimmerButtonProps {
  content: React.ReactNode
  title?: string
  handleClick: React.MouseEventHandler<HTMLDivElement>
  tile?: boolean
  background?: string
  backgroundHovered?: string
  loadingIndex?: number
  borderless?: boolean
  description?: string
}

export default function ShimmerButton ({
  content,
  title = undefined,
  handleClick,
  tile = false,
  background = 'rgb(32,32,32)',
  backgroundHovered = 'rgb(55,55,55)',
  loadingIndex = 0,
  borderless = false,
  description = ''
}: ShimmerButtonProps) {
  const angleModifier = 15 * (isMobile() ? 1.5 : 1)
  const translateModifier = 12 * (tile ? 1 : 0.5)
  const shadowPositionModifier = -15
  var parallaxAngleModifier = 0.7
  var parallaxTranslateModifier = 0.7
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
    xStandard: 0,
    yStandard: 0
  })
  const [hovered, setHover] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  var standardBorderRadius = tile ? '5px' : '200px'
  var hoveredBorderRadius = tile ? '30px' : '200px'
  if (borderless) {
    parallaxAngleModifier = 0
    parallaxTranslateModifier = 0
  }
  const mobileHoverModifier = 0.5
  const mobileHoverConstant = -12

  useEffect(() => {
    if (!containerRef.current) return
    function checkCenter () {
      const rect = containerRef.current!.getBoundingClientRect()
      const elementCenterY = rect.top + rect.height / 2
      const viewportCenterY = window.innerHeight / 2
      if (window.innerWidth < widthThreshold) {
        var hover =
          Math.abs(elementCenterY - viewportCenterY) <
          rect.height * mobileHoverModifier + mobileHoverConstant
        console.log(hover)
        setHover(hover)
        if (hover) {
          const relativeY = viewportCenterY - elementCenterY
          const relYStandardized = relativeY / (rect.height / 2)
          setCursorPosition({
            x: 0,
            xStandard: 0,
            y: relativeY,
            yStandard: relYStandardized
          })
        } else {
          setCursorPosition({ x: 0, xStandard: 0, y: 0, yStandard: 0 })
        }
      }
    }
    window.addEventListener('scroll', checkCenter, { passive: true })
    window.addEventListener('resize', checkCenter)
    checkCenter()
    return () => {
      window.removeEventListener('scroll', checkCenter)
      window.removeEventListener('resize', checkCenter)
    }
  }, [])

  function handleMouseMove (e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    // returns pixels on axis from center (-rect.dimension/2 < relativeAxis < rect.dimension/2)
    const relativeX = e.clientX - centerX
    const relativeY = e.clientY - centerY
    // returns the percent of the element the mouse is from the center (-1 < relAxisStandardized < 1)
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
      ref={containerRef}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={hovered ? { opacity: 1, scale: 1 } : undefined}
      animate={
        !hovered
          ? { opacity: 1, scale: 1, transition: { delay: loadingIndex * 0.1 } }
          : undefined
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.2
      }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        // i don't have the slightest clue why isMobile() doesn't work here 😭
        onMouseEnter={() =>
          window.innerWidth < widthThreshold ? undefined : setHover(true)
        }
        onMouseLeave={() =>
          window.innerWidth < widthThreshold ? undefined : setHover(false)
        }
        onHoverEnd={() => {
          setCursorPosition({ x: 0, y: 0, xStandard: 0, yStandard: 0 })
        }}
        style={{
          padding: '20px',
          margin: '-20px'
        }}
      >
        <motion.div
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
            rotateX: cursorPosition.yStandard * angleModifier,
            rotateY: -cursorPosition.xStandard * angleModifier,
            x: cursorPosition.xStandard * translateModifier,
            y: cursorPosition.yStandard * translateModifier,
            perspective: hovered ? '100px' : '0px',
            boxShadow: `${
              cursorPosition.xStandard * shadowPositionModifier
            }px ${
              cursorPosition.yStandard * shadowPositionModifier
            }px 20px rgba(0, 0, 0, ${hovered ? 0.4 : 0.2})`,
            transition: { duration: hovered ? 0 : 0.6 },
            borderRadius: hovered ? hoveredBorderRadius : standardBorderRadius,
            scale: !hovered ? 1 : tile ? 1.1 : 1.1,
            zIndex: hovered ? 99 : 1
          }}
          transition={{ duration: 0 }}
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            isolation: 'isolate'
          }}
          className='w-full h-full text-gray-900 dark:text-white overflow-visible cursor-pointer'
        >
          <motion.div
            className='shadow h-full flex flex-col justify-start'
            layoutId={`card-${title}`}
            animate={{
              borderRadius: hovered
                ? hoveredBorderRadius
                : standardBorderRadius,
              backgroundColor: hovered ? backgroundHovered : background,
              clipPath: `inset(0 round ${
                hovered ? hoveredBorderRadius : standardBorderRadius
              })`
            }}
            style={{
              overflow: 'hidden',
              position: 'relative',
              border:
                tile && !borderless ? `2px solid ${backgroundHovered}` : '',
              borderRadius: standardBorderRadius,
              transform: 'preserve-3d',
              padding: `calc(var(--spacing) * ${
                4 - (borderless ? 4 : tile ? 2 : 0)
              })`
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
                  scale: 1 + (hovered ? 0.1 : 0) + (borderless ? 0 : -0.1)
                }}
                transition={{ duration: 0.2 }}
              >
                {content || <p>No Content</p>}
              </motion.div>
            </motion.div>
            <motion.div
              animate={{
                opacity: hovered ? 0.4 : 0
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  height: '200px',
                  width: '200px',
                  position: 'fixed',
                  top: `calc(-40% + ${cursorPosition.y * 2.5}px - 100px)`,
                  left: `calc(50% + ${cursorPosition.x}px - 100px)`,
                  zIndex: 150,
                  pointerEvents: 'none',
                  borderRadius: '100%',
                  filter: 'blur(50px)'
                }}
                transition={{ duration: 0 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.p
        layoutId={`desc-${title}`}
        className='text-center text-sm'
        animate={{
          marginTop: hovered ? '40px' : '10px',
          marginBottom: hovered ? '-40px' : '-10px',
          color: hovered ? 'rgb(255,255,255)' : 'rgb(200,200,200)'
        }}
        transition={{ duration: hovered ? 0.1 : 0.6 }}
        style={{ display: description != '' ? 'block' : 'none' }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
