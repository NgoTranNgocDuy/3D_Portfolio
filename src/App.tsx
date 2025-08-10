import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Hobbies from './sections/Hobbies.jsx';
import Projects from './sections/Projects.jsx';
import WorkExperience from './sections/Experience.jsx';
import Skills from './sections/Skills.jsx';
import Testimonials from './sections/Testimonials.jsx';

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 min-h-screen text-white relative">
      <Navbar />
  <main className="max-w-screen-2xl px-12 mx-auto relative z-10">
        <Hero />
        <About />
        <Skills />
  <Projects />
  <Hobbies />
  <WorkExperience />
        <Testimonials />
        <Contact />
      </main>
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 opacity-20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500 opacity-20 rounded-full blur-2xl animate-pulse" />
      </div>
      <Footer />
    </div>
  );
};

export default App;
