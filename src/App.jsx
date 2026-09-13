import NebulaBackground from './components/NebulaBackground';
import Loader from './components/Loader';
import ProgressBar from './components/ProgressBar';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import Experience from './components/Experience';
import Education from './components/Education';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';
import './App.css';

export default function App() {
  return (
    <>
      <NebulaBackground />
      <Loader />
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Experience />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  );
}
