import React from "react";
import ProjectTile from "../projectTile";
import { LayoutGroup } from "framer-motion";

const projects = [
  {
    githubUrl: "https://github.com/Firebolt9907/rangish",
    webUrl: "https://rangish.netlify.app",
    title: "Rangish",
    year: "2025",
    technology: "React / TSX / Tailwind",
    description:
      "E-Commerce website created for a local artist to sell merchandise",
    imageSrc:
      "https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/react.svg?raw=true",
  },
  {
    githubUrl: "https://github.com/Firebolt9907/weatherML",
    title: "WeatherML",
    year: "2024",
    technology: "Python / Pytorch",
    description: "Pytorch ML model created to predict the weather in Clive, IA",
    imageSrc:
      "https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/pytorch.webp?raw=true",
  },
  {
    githubUrl: "https://github.com/Firebolt9907/praaccc",
    androidUrl:
      "https://play.google.com/store/apps/details?id=com.firebolt.prac",
    title: "Praaccc",
    year: "2023",
    technology: "Flutter",
    description: "App created to allow people on my swim team to rate workouts",
    imageSrc:
      "https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/react-refactor/assets/appIcons/praaccc.webp?raw=true",
  },
];

const FeaturedProjectsSection: React.FC = () => {
  return (
    <LayoutGroup>
      <section id="projects" className="py-16 p-8">
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectTile
              key={project.title}
              loadingIndex={index + 1}
              githubUrl={project.githubUrl}
              webUrl={project.webUrl}
              androidUrl={project.androidUrl}
              title={project.title}
              year={project.year}
              technology={project.technology}
              description={project.description}
              imageSrc={project.imageSrc}
            />
          ))}
        </div>
      </section>
    </LayoutGroup>
  );
};

export default FeaturedProjectsSection;

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || (window as any).opera;

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "iOS";
  }

  return "Desktop";
}

function getProperLink(android: string, ios: string, desktop: string) {
  const os = getMobileOperatingSystem();

  if (os === "Android") {
    return android;
  } else if (os === "iOS") {
    return ios;
  } else {
    return desktop;
  }
}
