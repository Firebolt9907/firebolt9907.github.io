import React from "react";
import ProjectTile from "../projectTile";
import { LayoutGroup } from "framer-motion";

const projects = [
  {
    githubUrl: "https://bnolphotos.com",
    webUrl: "https://bnolphotos.com",
    title: "BNOL Photos",
    year: "2025",
    technology: "Squarespace / REST / CSS",
    description:
      "E-Commerce website created for a local photographer to sell their photos",
    imageSrc:
      "https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/appIcons/bnollogo.jpeg?raw=true",
  },
  {
    githubUrl: "https://github.com/metallum-ultorum/IntoTheDeep",
    title: "MU FTC Robot Code",
    year: "2024-25",
    technology: "Java / FTC SDK",
    description: "Code for Metallum Ultorum Robot using Java OOP",
    imageSrc:
      "https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/langIcons/java.svg?raw=true",
  },
];

const WorkExperience: React.FC = () => {
  return (
    <LayoutGroup>
      <section id="projects" className="py-16 p-8">
        <h2 className="text-4xl font-semibold mb-8 text-center">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectTile
              key={project.title}
              loadingIndex={index + 1}
              githubUrl={project.githubUrl}
              webUrl={project.webUrl}
              androidUrl={project.androidUrl}
              iosUrl={project.iosUrl}
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

export default WorkExperience;

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
