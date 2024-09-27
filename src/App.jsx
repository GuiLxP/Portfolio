import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Footer from "./components/Footer"

import BG_GRADIENT from "./assets/bg-test.svg";

export default function App() {
  return (
    <>
      <div className="bg-background">
        <div
          style={{
            backgroundImage: `url(${BG_GRADIENT})`,
            backgroundSize: "cover",
            backgroundPosition: "",
          }}
        >
          <Navbar />
          <Hero />
          <Skills />
          <WorkExperience />
          <AboutMe />
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}
