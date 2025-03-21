import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Video from './sections/Video';
import Testimonials from './sections/Testimonials';
import Information from './sections/Information';
import Inscription from './sections/Inscription';
import Footer from './sections/Footer';
import Reto10dias from './pages/Reto10dias';
import Reto21dias from './pages/Reto21dias';
import Reto90dias from './pages/Reto90dias';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={
                    <>
                        <Navbar />
                        <Hero />
                        <Video id="video" />
                        <Information id="information" />
                        <Testimonials id="testimonials" />
                        <Inscription id="inscription" />
                        <Footer />
                    </>
                } />
                <Route path="/reto10dias" element={<Reto10dias />} />
                <Route path="/reto21dias" element={<Reto21dias />} />
                <Route path="/reto90dias" element={<Reto90dias />} />
                {/* Otras rutas... */}
            </Routes>
        </div>
    );
}

export default App;