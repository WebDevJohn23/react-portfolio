// PAGE: src/components/layout/MainContent.jsx
// Main page sections wrapper

import About from '../sections/About.jsx';
import Contact from '../sections/Contact.jsx';
import Hero from '../sections/Hero.jsx';
import Projects from '../sections/Projects.jsx';
import Stack from '../sections/Stack.jsx';
import './MainContent.scss';

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
