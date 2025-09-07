import { useState } from "react";
import type { Route } from "./+types/home";
import HeaderImages from "~/components/headerImages";
import NavBar from "~/components/navBar";
import GraphsSection from "~/components/graphs";
import SocialSection from "~/components/socialSection";
import Header from "~/components/header";
import FeaturedProjectsSection from "~/components/recruiters/featuredProjectsSection";
import FeaturedSocialSection from "~/components/recruiters/featuredSocialSection";
import WorkExperience from "~/components/recruiters/workExperience";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rishu Sharma's Websites" },
    {
      name: "description",
      content: "Welcome to Rishu Sharma's Personal Website",
    },
  ];
}

export default function Recruiters() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="text-white scroll-smooth">
      <NavBar />
      <HeaderImages hovered={hovered} setHovered={setHovered} />
      <Header />
      {/* <GraphsSection /> */}
      <FeaturedSocialSection />
      <FeaturedProjectsSection />
      <WorkExperience />
    </div>
  );
}
