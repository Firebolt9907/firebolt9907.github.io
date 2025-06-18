import { motion } from 'motion/react'
import type { FC } from 'react'

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
  return (
    <motion.button
      animate={{ scale: 1.05 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onTap={() => window.open(url, '_blank')}
      className='w-full max-w-sm mx-auto text-gray-900 dark:text-white transition-transform duration-300 transform hover:scale-105'
    >
        <div className='p-4 rounded-lg shadow'>
          <img className='mx-auto h-24 mb-4' src={imageSrc} alt={title} />
          <h3 className='text-xl font-bold mb-1 text-center'>{title}</h3>
          <h4 className='text-sm text-gray-600 dark:text-gray-300 mb-2 text-center'>
            {year} - {technology}
          </h4>
          <p className='text-center'>{description}</p>
        </div>
    </motion.button>
  )
}

export default ProjectTile
