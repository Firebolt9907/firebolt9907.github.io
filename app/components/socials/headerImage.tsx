import { motion } from "motion/react";
import React from "react";
import isMobile from "../scripts/isMobile";

interface HeaderImagesProps {}

const HeaderImages: React.FC<HeaderImagesProps> = () => {
  return (
    <motion.div
      initial={{
        opacity: 0.5,
        x: 0,
        y: 100,
        borderRadius: "2vw",
        height: "25vw",
        width: "17.5vw",
        zIndex: 60,
        scale: 0.5,
        marginLeft: "25vw",
        marginBottom: "30vw",
      }}
      animate={{
        rotateZ: [360, 0],
        borderRadius: "2vw",
        height: isMobile() ? "67vw" : "25vw",
        width: isMobile() ? "50vw" : "17.5vw",
        scale: 1.5,
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0.4,
          duration: 0.6,
        },
        marginTop: isMobile() ? "15vw" : "0vw",
      }}
      whileHover={
        !isMobile()
          ? {
              // rotateZ: [0, 360],
              borderRadius: "22vw",
              height: "25vw",
              width: "25vw",
              scale: 1.8,
              transition: {
                type: "spring",
                bounce: 0.6,
                duration: 0.8,
                ease: "easeInOut",
              },
              marginLeft: "5vw",
              marginRight: "5vw",
            }
          : undefined
      }
      className="rounded-full overflow-hidden shadow-lg hover:shadow-4xl transition-shadow duration-300"
    >
      <motion.img
        className="centered h-full w-full object-cover"
        src="https://github.com/Firebolt9907/firebolt9907.github.io/blob/react-refactor/assets/myPics/goofypfp.webp?raw=true"
        alt="Goofy Photo"
      />
    </motion.div>
  );
};

export default HeaderImages;
