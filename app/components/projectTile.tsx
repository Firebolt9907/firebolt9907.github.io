import { motion } from 'motion/react'
import { useState, type FC } from 'react'

interface ProjectTileProps {
  url: string
  title: string
  year: string
  technology: string
  description: string
  imageSrc: string
}

const ProjectTile: FC<ProjectTileProps> = ({
  url,
  title,
  year,
  technology,
  description,
  imageSrc
}) => {
  const [stateOpen, setOpen] = useState(false)
  function handleToggle () {
    setOpen(!stateOpen)
  }
  return stateOpen ? (
    <div
      className='overlay fixed inset-0 w-full flex items-center justify-center'
      onClick={handleToggle}
      style={{ zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
    >
      <motion.div
        layoutId={title}
        className='modal'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.8 }}
      >
        <motion.div
          className='modal-content'
          initial={{ rotateY: 180 }}
          animate={{ rotateY: 0 }}
          transition={{
            delay: 0.0,
            type: 'spring',
            bounce: 0.3,
            duration: 1.2
          }}
        >
          <div className='p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-gray-900 dark:text-white flex'>
            <img className='mx-auto h-80 mb-4' src={imageSrc} alt={title} />
            <div>
              <h3 className='text-4xl font-bold mb-1'>{title}</h3>
              <h4 className='text-2xl text-gray-600 dark:text-gray-300 mb-2 '>
                {year} - {technology}
              </h4>
              <p className=''>{description}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <motion.div layoutId={title} className='card' onClick={handleToggle}>
      <motion.button
        initial={{ rotateY: 180 }}
        animate={{ scale: 1.05, opacity: 1, rotateY: 0 }}
        transition={{
          delay: -0.2,
          type: 'spring',
          bounce: 0.3,
          duration: 0.4
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        // onTap={() => window.open(url, '_blank')}
        className='w-full max-w-sm mx-auto text-gray-900 dark:text-white transition-transform duration-300 transform hover:scale-105'
      >
        <div className='p-4 rounded-lg shadow'>
          <img className='mx-auto h-24 mb-4' src={imageSrc} alt={title} />
          <h4 className='text-sm text-gray-600 dark:text-gray-300 mb-2 text-center'>
            {year} - {technology}
          </h4>
          <p className='text-center'>{description}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}

export default ProjectTile
