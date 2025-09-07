import React from "react";
import SocialTile from "./socialTile";

const SocialSection: React.FC = () => {
  return (
    <section id="social" className="py-16 p-8">
      <h2 className="text-4xl font-semibold mb-8 text-center">Socials</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-3  px-6">
        <SocialTile
          platform="Github"
          platformSrc="https://github.com/Firebolt9907/firebolt9907.github.io/raw/refs/heads/main//assets/langIcons/githublogo.svg"
          pfpSrc="https://avatars.githubusercontent.com/u/83421723?v=4"
          url="https://github.com/Firebolt9907"
        />
        <SocialTile
          platform="Linkedin"
          platformSrc="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main//assets/langIcons/linkedin.webp?raw=true"
          url="https://www.linkedin.com/in/rishit-sharma-2a7904299/"
          pfpSrc="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main//assets/myPics/professionalpfp.webp?raw=true"
        />
        <SocialTile
          platform="Email"
          platformSrc="https://raw.githubusercontent.com/Firebolt9907/sharmaPhotography/21dfa99a75751c0fb4cc679c6383a883f3a71621/photos/email-logo.svg"
          url="mailto:rishushar99@gmail.com"
          pfpSrc="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main//assets/myPics/professionalpfp.webp?raw=true"
          username="rishushar99@gmail.com"
        />
      </div>
    </section>
  );
};

export default SocialSection;
