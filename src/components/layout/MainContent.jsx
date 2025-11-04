import Projects from '../sections/Projects.jsx';
import Hero from '../sections/Hero.jsx';
import Stack from '../sections/Stack.jsx';
import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import './MainComponent.scss';

export default function MainContent() {
  return (
    <main className="mainContent">
      <Hero />
      <Stack />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
