import { useState, useEffect } from 'react';
import { Header, About, Work, Skills, Testimonial, Footer } from './container';
import Navbar from './components/Navbar/Navbar'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

import { ThemeProvider } from './context/ThemeContext'
import './App.scss'

function App() {

  return (
    <ThemeProvider>
      
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  )
}

export default App
