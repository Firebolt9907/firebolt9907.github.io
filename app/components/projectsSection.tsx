import React from 'react'
import ProjectTile from './projectTile'
import { LayoutGroup } from 'framer-motion'

const ProjectsSection: React.FC = () => {
  return (
    <LayoutGroup>
      <section id='projects' className='py-16'>
        <h2 className='text-4xl font-semibold mb-8 text-center'>Projects</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/weatherML'
            title='WeatherML'
            year='2024'
            technology='Python/Pytorch'
            description='Pytorch ML model created to predict the weather in Clive, IA'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/pytorch.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/metallum-ultorum/IntoTheDeep'
            title='MU FTC Robot Code'
            year='2024-25'
            technology='Java'
            description='Code for Metallum Ultorum Robot using Java OOP'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/java.svg?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/Zpp'
            androidUrl='https://play.google.com/store/apps/details?id=com.firebolt.zpp'
            title='Zpp'
            year='2022'
            technology='Flutter'
            description='First app made to solve many small problems in daily life'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/appIcons/zpp.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/Stock-App'
            title='Stocks'
            year='2023'
            technology='Flutter'
            description='Stocks app made for clean UI and simplicity in mind'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/react-refactor/assets/langIcons/flutter.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/firebolt9907.github.io'
            webUrl='https://firebolt9907.github.io/'
            title='Old Website'
            year='2025'
            technology='HTML/CSS/JS'
            description='Portfolio website showcasing my projects and skills made in vanilla HTML, CSS, and JS'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/htmlCssJs.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Deus-Ex-Machina-38433/DEM-RC-Master'
            title='DEM FTC Robot Code'
            year='2021-23'
            technology='Java'
            description='Code for Deus Ex Machina Robot using Java OOP'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/java.svg?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/ultimate-tag-flutter'
            androidUrl='https://play.google.com/store/apps/details?id=com.firebolt.ultimate_tag'
            title='Ultimate Tag'
            year='2022-23'
            technology='Flutter'
            description='Multiplayer Game with entirely custom UI for classmates'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/appIcons/ultimatetag.png?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/spotify_view'
            title='Spotify View'
            year='2023'
            technology='Flutter'
            description='App created to turn my phone into a Car Thing with lyrics'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/react-refactor/assets/langIcons/flutter.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/praaccc'
            androidUrl='https://play.google.com/store/apps/details?id=com.firebolt.prac'
            title='Praaccc'
            year='2023'
            technology='Flutter'
            description='App created to allow people on my swim team to rate workouts'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/react-refactor/assets/appIcons/praaccc.webp?raw=true'
          />
          <ProjectTile
            githubUrl='https://github.com/Firebolt9907/gradeManipulator'
            title='Grade Manipulator'
            year='2024'
            technology='Flutter'
            description='App created to calculate grades with weighted sections'
            imageSrc='https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/react-refactor/assets/langIcons/flutter.webp?raw=true'
          />
        </div>
      </section>
    </LayoutGroup>
  )
}

export default ProjectsSection

function getMobileOperatingSystem () {
  const userAgent = navigator.userAgent || (window as any).opera

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return 'iOS'
  }

  return 'Desktop'
}

function getProperLink (android: string, ios: string, desktop: string) {
  const os = getMobileOperatingSystem()

  if (os === 'Android') {
    return android
  } else if (os === 'iOS') {
    return ios
  } else {
    return desktop
  }
}
