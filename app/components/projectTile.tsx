import { motion } from 'framer-motion'
import { useState, useEffect, type FC } from 'react'

interface ProjectTileProps {
  githubUrl: string
  webUrl?: string
  androidUrl?: string
  iosUrl?: string
  title: string
  year: string
  technology: string
  description: string
  imageSrc: string
}

const layoutTransition = {
  type: 'spring',
  stiffness: 150,
  damping: 15
} as const

const ProjectTile: FC<ProjectTileProps> = ({
  githubUrl,
  webUrl = '',
  androidUrl = '',
  iosUrl = '',
  title,
  year,
  technology,
  description,
  imageSrc
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

  function handleToggle () {
    setOpen(!stateOpen)
  }

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  return stateOpen ? (
    <div
      className='overlay fixed inset-0 w-full flex items-center justify-center'
      onClick={handleToggle}
      style={{ zIndex: 1000 }}
    >
      <motion.div
        className='absolute inset-0 bg-black'
        initial={{ opacity: 0, backdropFilter: 'blur(20px)' }}
        animate={{ opacity: 0.8, backdropFilter: 'blur(20px)' }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        layoutId={title}
        transition={layoutTransition}
        className='modal w-full max-w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'
        onClick={stopPropagation}
        onMouseMove={handleMouseMove}
        initial={{
          borderRadius: '40px'
        }}
        style={{
          position: 'sticky'
        }}
      >
        <motion.div
          className='p-6 shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row items-center gap-6'
          layoutId={`card-${title}`}
        >
          <motion.img
            layoutId={`image-${title}`}
            className='w-full h-auto max-h-80 object-contain'
            animate={{ borderRadius: '30px' }}
            src={imageSrc}
            alt={title}
          />
          <div className='text-left w-full'>
            <motion.h3
              layoutId={`title-${title}`}
              className='text-3xl font-bold mb-1'
            >
              {title}
            </motion.h3>
            <motion.h4
              layoutId={`tech-${title}`}
              className='text-xl text-gray-600 dark:text-gray-400 mb-2'
            >
              {year} - {technology}
            </motion.h4>
            <motion.p layoutId={`desc-${title}`} className='text-base'>
              {description}
            </motion.p>
            <div className='flex flex-row md:flex-row items-start md:items-center'>
              {webUrl != '' ? (
                <motion.button
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    marginTop: '10px',
                    marginLeft: '0px',
                    marginRight: '10px',
                    color: 'black'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                  onClick={() => window.open(webUrl, '_blank')}
                >
                  <div
                    className='icons8-new-tab'
                    style={{
                      marginLeft: '5px',
                      marginRight: '-2px',
                      marginBottom: '-2px'
                    }}
                  ></div>
                  Open
                </motion.button>
              ) : (
                <div></div>
              )}
              {androidUrl != '' ? (
                <motion.button
                  style={{
                    backgroundColor: 'green',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    marginTop: '10px',
                    marginLeft: '0px',
                    marginRight: '10px'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                  onClick={() => window.open(webUrl, '_blank')}
                >
                  <div
                    className='icons8-new-tab'
                    style={{
                      marginLeft: '5px',
                      marginRight: '-2px',
                      marginBottom: '-2px'
                    }}
                  ></div>
                  Android
                </motion.button>
              ) : (
                <div></div>
              )}
              {iosUrl != '' ? (
                <motion.button
                  style={{
                    backgroundColor: 'green',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    marginTop: '10px',
                    marginLeft: '0px',
                    marginRight: '10px'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring', delay: 0.1 }}
                  onClick={() => window.open(webUrl, '_blank')}
                >
                  <div
                    className='icons8-new-tab'
                    style={{
                      marginLeft: '5px',
                      marginRight: '-2px',
                      marginBottom: '-2px'
                    }}
                  ></div>
                  iOS
                </motion.button>
              ) : (
                <div></div>
              )}
              <motion.button
                style={{
                  backgroundColor: '#2b3137',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  marginTop: '10px',
                  marginLeft: '0px'
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: 'spring', delay: 0.2 }}
                onClick={() => window.open(githubUrl, '_blank')}
              >
                <div
                  className='icons8-new-tab'
                  style={{
                    marginLeft: '5px',
                    marginRight: '-2px',
                    marginBottom: '-2px'
                  }}
                ></div>
                Source Code
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <motion.div
      layoutId={title}
      transition={layoutTransition}
      className='card cursor-pointer p-2'
      onClick={handleToggle}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        whileHover={{
          scale: 1.0,
          rotateX: -cursorPosition.y / 7,
          rotateY: cursorPosition.x / 10,
          perspective: '100px',
          boxShadow: `${(cursorPosition.x / -10) * 1.5}px ${
            (cursorPosition.y / -7) * 1.5
          }px 20px rgba(0, 0, 0, 0.4)`,
          transition: { duration: 0 },
          borderRadius: '20px'
        }}
        whileTap={{
          scale: 0.95,
          rotateX: 0,
          rotateY: 0,
          perspective: '0px',
          transition: { duration: 0.3 },
          boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.8)`
        }}
        animate={{
          rotateX: 0,
          rotateY: 0,
          perspective: '0px',
          boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.2)`,
          transition: { duration: 0.3 },
          borderRadius: '5px'
        }}
        // style={{
        //   boxShadow: `${cursorPosition.x / -10}px ${
        //     cursorPosition.y / -7
        //   }px 20px rgba(0, 0, 0, 0.4)`
        // }}
        onHoverEnd={() => {
          setCursorPosition({ x: 0, y: 0 })
        }}
        transition={{ duration: 0 }}
        className='w-full h-full max-w-sm mx-auto text-gray-900 dark:text-white'
      >
        <motion.div
          className='p-4 shadow h-full flex flex-col justify-start project-tile'
          layoutId={`card-${title}`}
          animate={{ borderRadius: '5px', backgroundColor: 'rgb(32,32,32)' }}
          whileHover={{
            borderRadius: '20px',
            backgroundColor: 'rgb(55,55,55)'
          }}
        >
          <motion.img
            layoutId={`image-${title}`}
            className='mx-auto h-24 mb-4 object-contain'
            src={imageSrc}
            alt={title}
            style={{ borderRadius: '15%' }}
          />
          <motion.h3
            layoutId={`title-${title}`}
            className='text-lg font-bold text-center'
          >
            {title}
          </motion.h3>
          <motion.h4
            layoutId={`tech-${title}`}
            className='text-xs text-gray-500 dark:text-gray-400 mb-2 text-center'
          >
            {year} - {technology}
          </motion.h4>
          <motion.p
            layoutId={`desc-${title}`}
            className='text-center text-sm text-gray-600 dark:text-gray-300'
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectTile
