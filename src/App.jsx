import React from 'react';
    import Hero from './sections/Hero';
    import Video from './sections/Video';
    import Testimonials from './sections/Testimonials';
    import Information from './sections/Information';
    import Inscription from './sections/Inscription';
    import Footer from './sections/Footer';
    import Slider from "./components/Slider";

    function App() {
        return (
            <div>
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