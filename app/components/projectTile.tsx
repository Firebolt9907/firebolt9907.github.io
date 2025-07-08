import { motion } from 'framer-motion'
import { useState, useEffect, type FC } from 'react'
import ShimmerButton from './subcomponents/shimmerTile'

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
  loadingIndex: number
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
  imageSrc,
  loadingIndex = 0
}) => {
  const [stateOpen, setOpen] = useState(false)

  function handleToggle () {
    setOpen(!stateOpen)
  }

  var tileContent = (
    <div>
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
    </div>
  )

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
        className='modal w-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden'
        onClick={stopPropagation}
        // onMouseMove={handleMouseMove}
        initial={{
          borderRadius: '40px'
        }}
        style={{
          position: 'sticky',
          margin: 'auto'
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
            <div className='flex flex-row md:flex-row items-start md:items-center gap-2 mt-4'>
              {webUrl != '' ? (
                <ShimmerButton
                  content={<p style={{ color: 'black' }}>Open Website</p>}
                  handleClick={() => window.open(webUrl, '_blank')}
                  background='rgb(200,200,200)'
                  backgroundHovered='rgb(220,220,220)'
                  loadingIndex={
                    [webUrl, androidUrl, iosUrl, githubUrl]
                      .filter(Boolean)
                      .indexOf(webUrl) + 2
                  }
                  tile={false}
                  title='web'
                />
              ) : undefined}
              {androidUrl != '' ? (
                <ShimmerButton
                  content={<p>Android</p>}
                  handleClick={() => window.open(androidUrl, '_blank')}
                  background='rgb(39, 147, 39)'
                  backgroundHovered='rgb(60, 167, 60)'
                  loadingIndex={
                    [webUrl, androidUrl, iosUrl, githubUrl]
                      .filter(Boolean)
                      .indexOf(androidUrl) + 2
                  }
                  tile={false}
                  title='android'
                />
              ) : undefined}
              {iosUrl != '' ? (
                <ShimmerButton
                  content={<p>Source Code</p>}
                  handleClick={() => window.open(iosUrl, '_blank')}
                  background='blue'
                  // backgroundHovered='rgb(80,80,80)'
                  loadingIndex={
                    [webUrl, androidUrl, iosUrl, githubUrl]
                      .filter(Boolean)
                      .indexOf(iosUrl) + 2
                  }
                  tile={false}
                  title='ios'
                />
              ) : undefined}
              <ShimmerButton
                content={<p>Source Code</p>}
                handleClick={() => window.open(githubUrl, '_blank')}
                background='rgb(60,60,60)'
                backgroundHovered='rgb(80,80,80)'
                loadingIndex={
                  [webUrl, androidUrl, iosUrl, githubUrl]
                    .filter(Boolean)
                    .indexOf(githubUrl) + 2
                }
                tile={false}
                title='sourcecode'
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <motion.div
      layoutId={title}
      transition={layoutTransition}
      className='card p-2 cursor-pointer'
    >
      <ShimmerButton
        content={tileContent}
        title={title}
        handleClick={handleToggle}
        tile={true}
        loadingIndex={loadingIndex}
      />
    </motion.div>
  )
}

export default ProjectTile
