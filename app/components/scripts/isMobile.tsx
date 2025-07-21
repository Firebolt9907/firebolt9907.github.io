// https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs

import { useEffect, useState } from 'react'

export const widthThreshold = 600

function getWindowDimensions () {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize () {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default function isMobile () {
  return useWindowDimensions().width < widthThreshold
}
