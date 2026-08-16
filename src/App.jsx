import Header from './components/Header/Header.jsx'
import Preloader from './components/Preloader/Preloader.jsx'
import About from './sections/About/About.jsx'
import Advantages from './sections/Advantages/Advantages.jsx'
import Contact from './sections/Contact/Contact.jsx'
import Footer from './sections/Footer/Footer.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Process from './sections/Process/Process.jsx'
import SecurityVisual from './sections/SecurityVisual/SecurityVisual.jsx'
import Services from './sections/Services/Services.jsx'
import Statement from './sections/Statement/Statement.jsx'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'

function App() {
  useSmoothScroll()

  return (
    <>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Statement />
        <Process />
        <SecurityVisual />
        <Advantages />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
