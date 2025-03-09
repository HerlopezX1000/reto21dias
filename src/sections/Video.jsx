import React from 'react';
    import MotivacionalVideo from '../components/MotivacionalVideo';

    function Video() {
        return (
            <div className="contenedor video-section">
                <h2>Video Motivacional</h2>
                <MotivacionalVideo />
                <p>Una breve descripción del video.</p>
            </div>
        );
    }

    export default Video;