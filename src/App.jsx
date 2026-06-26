import { Header, About, Work, Skills, Testimonial, Footer } from './container';
import Navbar from './components/Navbar/Navbar'
import './App.scss'

function App() {

  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </>
  )
}

export default App
