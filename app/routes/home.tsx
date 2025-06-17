import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white scroll-smooth snap-y snap-mandatory">
      <header className="fixed inset-x-0 top-0 h-20 bg-gray-800/90 backdrop-blur z-50 flex items-center justify-between px-6">
        <img
          className="h-12"
          src="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/signature.png?raw=true"
          alt="My Signature"
        />
        <nav className="space-x-4">
          <a href="#projects" className="text-white px-3 py-2 rounded hover:bg-gray-700">
            Projects
          </a>
          <a href="#contact" className="text-white px-3 py-2 rounded hover:bg-gray-700">
            Contact
          </a>
        </nav>
      </header>

      <section id="img-section" className="pt-24 text-center space-x-4">
        <img
          className="inline-block w-1/4 rounded-full"
          src="https://avatars.githubusercontent.com/u/83421723?v=4"
          alt="My Github Profile Picture"
        />
        <img
          className="inline-block w-1/4 rounded-full"
          src="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true"
          alt="My Professional Headshot"
        />
        <img
          className="inline-block w-1/4 rounded-full"
          src="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/goofypfp.jpg?raw=true"
          alt="My Social Media Profile Picture"
        />
      </section>

      <section id="welcome-section" className="snap-start py-16 text-center">
        <h1 className="text-6xl font-bold mb-2">Rishu Sharma</h1>
        {/* <h2 className="text-2xl mb-4 opacity-0 hover:opacity-100 transition-opacity">Aspiring Software Developer</h2> */}
        <h2 className="text-2xl">Incoming Freshman in CS</h2>
      </section>

      <section id="dev-time" className="snap-start py-16">
        <h2 className="text-4xl font-semibold mb-8 text-center">Stats From Last Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Time Spent Coding Last Week</h3>
            <h4 className="text-lg mb-4">Total:</h4>
            <div className="flex space-x-2">
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-8"></div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Languages Used Last Week</h3>
            <div className="bg-gray-300 dark:bg-gray-700 h-32"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Code Editors Used Last Week</h3>
            <div className="bg-gray-300 dark:bg-gray-700 h-32"></div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Computers Used Last Week</h3>
            <div className="bg-gray-300 dark:bg-gray-700 h-32"></div>
          </div>
        </div>
      </section>

      <section id="projects" className="snap-start py-16 bg-gray-100">
        <h2 className="text-4xl font-semibold mb-8 text-center">Projects</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6">
          <a
            href="https://github.com/Firebolt9907/weatherML"
            target="_blank"
            className="transform hover:scale-105 transition-transform"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <img
                className="mx-auto h-24 mb-4"
                src="https://static-00.iconduck.com/assets.00/pytorch-icon-1694x2048-jgwjy3ne.png"
                alt="Pytorch Logo"
              />
              <h3 className="text-xl font-bold mb-1 text-center">WeatherML</h3>
              <h4 className="text-sm text-gray-600 dark:text-gray-300 mb-2 text-center">
                2024 – Python/PyTorch
              </h4>
              <p className="text-center">ML model predicting Clive, IA weather</p>
            </div>
          </a>
          {/* ...other tiles... */}
        </div>
      </section>

      <section id="social" className="snap-start py-16">
        <h2 className="text-4xl font-semibold mb-8 text-center">Socials</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 px-6">
          <a target="_blank" href="https://github.com/Firebolt9907">
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full"
                src="https://avatars.githubusercontent.com/u/83421723?v=4"
                alt="My Github Profile Picture"
              />
              <div>
                <h3 className="text-lg font-bold">@Firebolt9907</h3>
                <h4 className="text-sm text-gray-600 dark:text-gray-300">Joined April 2021</h4>
              </div>
            </div>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/rishit-sharma-2a7904299/"
          >
            <div className="flex items-center space-x-4">
              <img
                className="h-12 w-12 rounded-full"
                src="https://github.com/Firebolt9907/firebolt9907.github.io/blob/main/assets/professionalpfp.jpg?raw=true"
                alt="My Professional Headshot"
              />
              <div>
                <h3 className="text-lg font-bold">@Firebolt9907</h3>
                <h4 className="text-sm text-gray-600 dark:text-gray-300">Joined June 2024</h4>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
