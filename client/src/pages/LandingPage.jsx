import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Testimonials from '../components/Testimonials'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Testimonials/>
    <ContactSection/>
    <Footer/>
    </>
  )
}

export default LandingPage