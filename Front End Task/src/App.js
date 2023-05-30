
import './asset/css/custom.css'

import {BrowserRouter} from 'react-router-dom'

import Hero from './components/Hero';
import About from './components/About';
import Course from './components/Course';
import Services from './components/Services';
import Team from './components/Team';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import Navigation from './components/Navigation';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation/>
        <Hero/>
       <About/>
       <Course/>
       <Services/>
       <Team/>
       <Testimonial/>
       <Footer/>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
