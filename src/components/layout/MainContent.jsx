import Projects from "../sections/Projects.jsx";
import Hero from "../sections/Hero.jsx";
import Stack from "../sections/Stack.jsx";
import './MainComponent.scss';


export default function MainContent() {

    return (
        <main>
            <Hero />
            <Stack />
            <Projects />
        </main>
    );
}