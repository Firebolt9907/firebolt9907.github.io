import { motion } from 'framer-motion'
import { useState, useEffect, type FC } from 'react'
import ShimmerButton from './subcomponents/shimmerTile'

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
  function handleClick () {
    window.open(url, '_blank')
  }

  var content = (
    <div>
      <motion.img
        // layoutId={`platformimg-${platform}`}
        className='mx-auto h-24 mb-4 object-contain'
        src={platformSrc}
        alt={platform}
        style={{ borderRadius: '15%', filter: 'brightness(0) invert(1)' }}
      />
      <motion.h2
        // layoutId={`platform-${platform}`}
        className='text-xl font-bold text-center'
      >
        {platform}
      </motion.h2>
      <motion.h3
        // layoutId={`username-${platform}`}
        className='text-m text-gray-500 dark:text-gray-400 text-center'
      >
        @Firebolt9907
      </motion.h3>
    </div>
  )

  return (
    <ShimmerButton
      handleClick={handleClick}
      content={content}
      tile={true}
      title={platform}
    />
  )
}

export default SocialTile
