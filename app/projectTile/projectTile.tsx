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
    <a
      href={url}
      target='_blank'
      className='transform hover:scale-105 transition-transform'
    >
      <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow'>
        <img className='mx-auto h-24 mb-4' src={imageSrc} alt={title} />
        <h3 className='text-xl font-bold mb-1 text-center'>{title}</h3>
        <h4 className='text-sm text-gray-600 dark:text-gray-300 mb-2 text-center'>
          {year} - {technology}
        </h4>
        <p className='text-center'>{description}</p>
      </div>
    </a>
  )
}

export default ProjectTile
