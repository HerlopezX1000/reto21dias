import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero'; // Importa Hero
import Video from './sections/Video';
import Testimonials from './sections/Testimonials';
import Information from './sections/Information';
import Inscription from './sections/Inscription';
import Footer from './sections/Footer';

function App() {
    return (
        <div>
            <Navbar /> 
            <Hero /> 
            <Video id="video" />
            <Testimonials id="testimonials" />
            <Information id="information" />
            <Inscription id="inscription" />
            <Footer />
        </div>
    );
}

export default App;