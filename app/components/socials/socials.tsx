import React from "react";
import SocialTile from "../socialTile";

const SocialSection: React.FC = () => {
  return (
    <section id="social" className="py-16 p-4">
      <h2 className="text-4xl font-semibold mb-8 text-center">Socials</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 px-6">
        <SocialTile
          platform="Instagram"
          platformSrc="https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo_instagram-512.png"
          pfpSrc="https://avatars.githubusercontent.com/u/83421723?v=4"
          url="https://www.instagram.com/firebolt_9907/"
          username="@firebolt_9907"
          disableFilter={true}
        />
        <SocialTile
          platform="Snapchat"
          platformSrc="https://cdn.freebiesupply.com/logos/large/2x/snapchat-logo-png-transparent.png"
          pfpSrc="https://avatars.githubusercontent.com/u/83421723?v=4"
          url="https://www.snapchat.com/add/firebolt_9907"
          username="@firebolt_9907"
          disableFilter={true}
        />
        <SocialTile
          platform="Email"
          platformSrc="https://raw.githubusercontent.com/Firebolt9907/sharmaPhotography/21dfa99a75751c0fb4cc679c6383a883f3a71621/photos/email-logo.svg"
          url="mailto:ifxccjyssfghj@gmail.com"
          pfpSrc="https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/professionalpfp.webp?raw=true"
          username="ifxccjyssfghj@gmail.com"
        />
      </div>
    </section>
  );
};

export default SocialSection;
