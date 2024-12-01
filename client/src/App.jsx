
import {  Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage"
import Movies from './pages/Movies';
import Books from './pages/Books';
import Webseries from './pages/Webseries';
import Contact from './pages/Contact';

function App() {
  
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/webseries" element={<Webseries/>} />
        <Route path="/contact" element={<Contact/>} />
        
    </Routes>
  )
}

export default App
