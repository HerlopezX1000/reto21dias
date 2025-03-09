import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import Navbar from './components/Navbar';
    import Video from './sections/Video';

    function App() {
        return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/video" element={<Video />} />
                    {/* Agrega más rutas aquí */}
                </Routes>
            </Router>
        );
    }

    export default App;