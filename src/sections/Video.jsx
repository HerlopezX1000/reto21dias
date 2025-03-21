import React from 'react';
    import '../styles/Video.css'; // Importa el archivo CSS

    function Video() {
        return (
            <section id="video" className="video-section">
               
                <div className="video-container">
                    <iframe
                        width="800"
                        height="400"
                        src="https://www.youtube.com/embed/iW7Cq_NARGw?si=jg5YKtHVjcxj9f43" // Reemplaza con tu ID
                        title="Video Promocional"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        );
    }

    export default Video;