import { useState } from "react";
import type { Route } from "./+types/home";
import NavBar from "~/components/navBar";
import HeaderImages from "~/components/socials/headerImage";
import SocialSection from "~/components/socials/socials";
import Header from "~/components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rishu Sharma's Websites" },
    {
      name: "description",
      content: "Welcome to Rishu Sharma's Personal Website",
    },
  ];
}

export default function Socials() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="text-white scroll-smooth">
      <NavBar />
      <HeaderImages />
      <Header />
      <SocialSection />
    </div>
  );
}
