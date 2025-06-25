import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const HeaderImages = ({ hovered, setHovered }) => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "img-section",
      className: "pt-24 text-center flex justify-center",
      style: { margin: "7vw 0vw", marginTop: "calc(5vw + 20px)" },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: {
              opacity: 0,
              scale: 0.8,
              marginRight: "0vw",
              marginLeft: "-40vw"
            },
            animate: {
              opacity: hovered ? 1 : 0,
              scale: hovered ? 1 : 0.8,
              marginRight: "0vw"
            },
            transition: { duration: 0.8, type: "spring", bounce: 0.4 },
            className: "w-1/4 h-25vw rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-full w-full object-cover rounded-full",
                src: "https://avatars.githubusercontent.com/u/83421723?v=4",
                alt: "My Github Profile Picture"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: {
              opacity: 0.5,
              x: 0,
              borderRadius: "2vw",
              height: "25vw",
              width: "17.5vw",
              zIndex: 60,
              marginLeft: "-25vw",
              marginRight: "-25vw",
              scale: 0.5
            },
            animate: {
              rotateZ: [360, 0],
              borderRadius: "2vw",
              height: "25vw",
              width: "17.5vw",
              scale: 1.5,
              opacity: 1,
              transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.6
              },
              marginLeft: "-18vw",
              marginRight: "-18vw"
            },
            whileHover: {
              // rotateZ: [0, 360],
              borderRadius: "22vw",
              height: "25vw",
              width: "25vw",
              scale: 1.8,
              transition: {
                type: "spring",
                bounce: 0.6,
                duration: 0.8,
                ease: "easeInOut"
              },
              marginLeft: "5vw",
              marginRight: "5vw"
            },
            onHoverStart: () => setHovered(true),
            onHoverEnd: () => setHovered(false),
            className: "inline-block w-1/4 rounded-full overflow-hidden shadow-lg hover:shadow-4xl transition-shadow duration-300",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                className: "centered h-full w-full object-cover",
                src: "https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true",
                alt: "My Professional Headshot"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, marginRight: "-40vw" },
            animate: { opacity: hovered ? 1 : 0 },
            transition: { duration: 0.3 },
            className: "inline-block w-1/4 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-full w-full object-cover rounded-full",
                src: "https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/goofypfp.jpg?raw=true",
                alt: "My Social Media Profile Picture"
              }
            )
          }
        )
      ]
    }
  );
};
const layoutTransition = {
  type: "spring",
  stiffness: 150,
  damping: 15
};
const ProjectTile = ({
  githubUrl,
  visitUrl = "",
  title,
  year,
  technology,
  description,
  imageSrc
}) => {
  const [stateOpen, setOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relativeX = e.clientX - centerX;
    const relativeY = e.clientY - centerY;
    setCursorPosition({ x: relativeX, y: relativeY });
  }
  function handleToggle() {
    setOpen(!stateOpen);
  }
  const stopPropagation = (e) => e.stopPropagation();
  return stateOpen ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "overlay fixed inset-0 w-full flex items-center justify-center",
      onClick: handleToggle,
      style: { zIndex: 1e3 },
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black",
            initial: { opacity: 0 },
            animate: { opacity: 0.8 },
            transition: { duration: 0.3 }
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            layoutId: title,
            transition: layoutTransition,
            className: "modal w-full max-w-2xl relative overflow-hidden",
            onClick: stopPropagation,
            onMouseMove: handleMouseMove,
            style: {
              marginTop: `calc(${-1450 + window.scrollY * 2}px - 40vw + 100vh)`,
              borderRadius: "40px"
            },
            children: /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "p-6 shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col md:flex-row items-center gap-6",
                layoutId: `card-${title}`,
                children: [
                  /* @__PURE__ */ jsx(
                    motion.img,
                    {
                      layoutId: `image-${title}`,
                      className: "w-full h-auto max-h-80 object-contain",
                      style: { width: "500px" },
                      src: imageSrc,
                      alt: title
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "text-left w-full", children: [
                    /* @__PURE__ */ jsx(
                      motion.h3,
                      {
                        layoutId: `title-${title}`,
                        className: "text-3xl font-bold mb-1",
                        children: title
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      motion.h4,
                      {
                        layoutId: `tech-${title}`,
                        className: "text-xl text-gray-600 dark:text-gray-400 mb-2",
                        children: [
                          year,
                          " - ",
                          technology
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(motion.p, { layoutId: `desc-${title}`, className: "text-base", children: description }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-row md:flex-row items-start md:items-center", children: [
                      visitUrl != "" ? /* @__PURE__ */ jsxs(
                        motion.button,
                        {
                          style: {
                            backgroundColor: "green",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            marginTop: "10px",
                            marginLeft: "0px",
                            marginRight: "10px"
                          },
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { duration: 0.4, type: "spring", delay: 0.1 },
                          onClick: () => window.open(visitUrl, "_blank"),
                          children: [
                            "Open",
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "icons8-new-tab",
                                style: {
                                  marginLeft: "5px",
                                  marginRight: "-2px",
                                  marginBottom: "-2px"
                                }
                              }
                            )
                          ]
                        }
                      ) : /* @__PURE__ */ jsx("div", {}),
                      /* @__PURE__ */ jsxs(
                        motion.button,
                        {
                          style: {
                            backgroundColor: "#2b3137",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            marginTop: "10px",
                            marginLeft: "0px"
                          },
                          initial: { opacity: 0, scale: 0 },
                          animate: { opacity: 1, scale: 1 },
                          transition: { duration: 0.4, type: "spring", delay: 0.2 },
                          onClick: () => window.open(githubUrl, "_blank"),
                          children: [
                            "Source Code",
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "icons8-new-tab",
                                style: {
                                  marginLeft: "5px",
                                  marginRight: "-2px",
                                  marginBottom: "-2px"
                                }
                              }
                            )
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  ) : /* @__PURE__ */ jsx(
    motion.div,
    {
      layoutId: title,
      transition: layoutTransition,
      className: "card cursor-pointer p-2",
      onClick: handleToggle,
      onMouseMove: handleMouseMove,
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          whileHover: {
            scale: 1,
            rotateX: -cursorPosition.y / 7,
            rotateY: cursorPosition.x / 10,
            perspective: "100px",
            boxShadow: `${cursorPosition.x / -10}px ${cursorPosition.y / -7}px 20px rgba(0, 0, 0, 0.3)`,
            transition: { duration: 0 }
          },
          whileTap: {
            scale: 0.95,
            rotateX: 0,
            rotateY: 0,
            perspective: "0px",
            transition: { duration: 0.3 }
          },
          animate: {
            rotateX: 0,
            rotateY: 0,
            perspective: "0px",
            boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.3)`,
            transition: { duration: 0.3 }
          },
          style: {
            boxShadow: `${cursorPosition.x / -10}px ${cursorPosition.y / -7}px 20px rgba(0, 0, 0, 0.3)`
          },
          onHoverEnd: () => {
            setCursorPosition({ x: 0, y: 0 });
          },
          transition: { duration: 0 },
          className: "w-full h-full max-w-sm mx-auto text-gray-900 dark:text-white",
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              className: "p-4 rounded-lg shadow bg-gray-100 dark:bg-gray-900 h-full flex flex-col justify-start",
              layoutId: `card-${title}`,
              style: {
                transformStyle: "preserve-3d"
              },
              children: [
                /* @__PURE__ */ jsx(
                  motion.img,
                  {
                    layoutId: `image-${title}`,
                    className: "mx-auto h-24 mb-4 object-contain",
                    src: imageSrc,
                    alt: title
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.h3,
                  {
                    layoutId: `title-${title}`,
                    className: "text-lg font-bold text-center",
                    children: title
                  }
                ),
                /* @__PURE__ */ jsxs(
                  motion.h4,
                  {
                    layoutId: `tech-${title}`,
                    className: "text-xs text-gray-500 dark:text-gray-400 mb-2 text-center",
                    children: [
                      year,
                      " - ",
                      technology
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  motion.p,
                  {
                    layoutId: `desc-${title}`,
                    className: "text-center text-sm text-gray-600 dark:text-gray-300",
                    children: description
                  }
                )
              ]
            }
          )
        }
      )
    }
  );
};
const ProjectsSection = () => {
  return /* @__PURE__ */ jsx(LayoutGroup, { children: /* @__PURE__ */ jsxs("section", { id: "projects", className: "py-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold mb-8 text-center", children: "Projects" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4", children: [
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/weatherML",
          title: "WeatherML",
          year: "2024",
          technology: "Python/Pytorch",
          description: "Pytorch ML model created to predict the weather in Clive, IA",
          imageSrc: "https://static-00.iconduck.com/assets.00/pytorch-icon-1694x2048-jgwjy3ne.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/metallum-ultorum/IntoTheDeep",
          title: "MU FTC Robot Code",
          year: "2024-25",
          technology: "Java",
          description: "Code for Metallum Ultorum Robot using Java OOP",
          imageSrc: "https://cdn.freebiesupply.com/logos/large/2x/java-logo-svg-vector.svg"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/Zpp",
          visitUrl: "https://play.google.com/store/apps/details?id=com.firebolt.zpp",
          title: "Zpp",
          year: "2022",
          technology: "Flutter",
          description: "First app made to solve many small problems in daily life",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/Stock-App",
          title: "Stocks",
          year: "2023",
          technology: "Flutter",
          description: "Stocks app made for clean UI and simplicity in mind",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/firebolt9907.github.io",
          title: "This Website",
          year: "2025",
          technology: "HTML/CSS/JS",
          description: "Portfolio website showcasing my projects and skills",
          imageSrc: "https://imakestuff.online/wp-content/uploads/2019/12/HTML-CSS-JS-Logo.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Deus-Ex-Machina-38433/DEM-RC-Master",
          title: "DEM FTC Robot Code",
          year: "2021-23",
          technology: "Java",
          description: "Code for Deus Ex Machina Robot using Java OOP",
          imageSrc: "https://cdn.freebiesupply.com/logos/large/2x/java-logo-svg-vector.svg"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/ultimate-tag-flutter",
          title: "Ultimate Tag",
          year: "2022-23",
          technology: "Flutter",
          description: "Multiplayer Game with entirely custom UI for classmates",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/spotify_view",
          title: "Spotify View",
          year: "2023",
          technology: "Flutter",
          description: "App created to turn my phone into a Car Thing with lyrics",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/praaccc",
          title: "Praaccc",
          year: "2023",
          technology: "Flutter",
          description: "App created to allow people on my swim team to rate workouts",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectTile,
        {
          githubUrl: "https://github.com/Firebolt9907/gradeManipulator",
          title: "Grade Manipulator",
          year: "2024",
          technology: "Flutter",
          description: "App created to calculate grades with weighted sections",
          imageSrc: "https://img.icons8.com/color/512/flutter.png"
        }
      )
    ] })
  ] }) });
};
const NavBar = () => {
  return /* @__PURE__ */ jsxs("header", { className: "fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "h-12",
        src: "https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/signature.png?raw=true",
        alt: "My Signature"
      }
    ),
    /* @__PURE__ */ jsxs("nav", { className: "space-x-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#projects",
          className: "text-white px-3 py-2 rounded hover:bg-gray-700",
          children: "Projects"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "#contact",
          className: "text-white px-3 py-2 rounded hover:bg-gray-700",
          children: "Contact"
        }
      )
    ] })
  ] });
};
const GraphsSection = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [langStats, setLangStats] = useState([]);
  const [editorStats, setEditorStats] = useState([]);
  const [osStats, setOsStats] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, langRes, editorRes, osRes] = await Promise.all([
          fetch(
            "https://wakatime.com/share/@firebolt9907/6c2bf50d-513e-4529-84a5-36c8fdf7cb3d.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/933b30fe-3770-4aae-8eea-78e2f011955c.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/2ccbe765-7e3c-42c1-8a41-82f02a9835ed.json"
          ),
          fetch(
            "https://wakatime.com/share/@firebolt9907/45cdaf8f-c702-470c-9c29-1a10013bc33d.json"
          )
        ]);
        const dailyData = await dailyRes.json();
        setDailyStats(dailyData.data);
        const total = dailyData.data.reduce(
          (acc, curr) => acc + curr.grand_total.total_seconds,
          0
        );
        setTotalTime(total);
        const langData = await langRes.json();
        setLangStats(langData.data);
        const editorData = await editorRes.json();
        setEditorStats(editorData.data);
        const osData = await osRes.json();
        setOsStats(osData.data);
      } catch (error) {
        console.error("Failed to fetch WakaTime data:", error);
      }
    };
    fetchData();
  }, []);
  Math.max(
    ...dailyStats.map((d) => d.grand_total.total_seconds),
    1
  );
  return /* @__PURE__ */ jsxs("section", { id: "dev-time", className: "snap-start py-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold mb-8 text-center", children: "Stats From Last Week" }),
    /* @__PURE__ */ jsx("h3", { className: "text-center size-2xl mb-4 text-gray-600 dark:text-gray-400", children: "Unfortunately, I have had to stop using WakaTime, as Github Hack Club uses a fork called Hackatime that does not have API access :(" })
  ] });
};
const SocialSection = () => {
  return /* @__PURE__ */ jsxs("section", { id: "social", className: "py-16", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold mb-8 text-center", children: "Socials" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-8 grid-cols-1 sm:grid-cols-2 px-6", children: [
      /* @__PURE__ */ jsx("a", { target: "_blank", href: "https://github.com/Firebolt9907", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "h-12 w-12 rounded-full",
            src: "https://avatars.githubusercontent.com/u/83421723?v=4",
            alt: "My Github Profile Picture"
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "@Firebolt9907" }),
          /* @__PURE__ */ jsx("h4", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Joined April 2021" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        "a",
        {
          target: "_blank",
          href: "https://www.linkedin.com/in/rishit-sharma-2a7904299/",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-12 w-12 rounded-full",
                src: "https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true",
                alt: "My Professional Headshot"
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "@Firebolt9907" }),
              /* @__PURE__ */ jsx("h4", { className: "text-sm text-gray-600 dark:text-gray-300", children: "Joined June 2024" })
            ] })
          ] })
        }
      )
    ] })
  ] });
};
const Header = () => {
  return /* @__PURE__ */ jsxs("section", { id: "welcome-section", className: "py-16 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold mb-2", children: "Rishu Sharma" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-4 opacity-0 hover:opacity-100 transition-opacity", children: "Aspiring Software Developer" })
  ] });
};
function meta({}) {
  return [{
    title: "Rishu Sharma's Portfolio"
  }, {
    name: "description",
    content: "Portfolio"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ jsxs("div", {
    className: "text-gray-900 dark:text-white scroll-smooth",
    children: [/* @__PURE__ */ jsx(NavBar, {}), /* @__PURE__ */ jsx(HeaderImages, {
      hovered,
      setHovered
    }), /* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx(GraphsSection, {}), /* @__PURE__ */ jsx(ProjectsSection, {}), /* @__PURE__ */ jsx(SocialSection, {})]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DZAi_oRo.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DOSr7_LT.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": ["/assets/root-BzsQU8S0.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BquoWf9I.js", "imports": ["/assets/chunk-NL6KNZEE-CfxFt-pq.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-0bdafa34.js", "version": "0bdafa34", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
