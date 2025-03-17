import React, { useState } from 'react';
    import '../styles/testimonials.css'; // Importa el archivo CSS

    function Testimonials() {
        // Array de videos de ejemplo
        const videos = [
            { id: 'vJyXg7EASNo', title: 'Testimonio 1' },
            { id: 'tVtnIf-8w4c', title: 'Testimonio 2' },
            { id: 'gNnq3MLSSsA', title: 'Testimonio 3' },
            
        ];

        const [currentVideo, setCurrentVideo] = useState(videos[0]); // Estado para el video actual

        const handleThumbnailClick = (video) => {
            setCurrentVideo(video); // Cambia el video actual
        };

        return (
            <section id="testimonials" className="testimonials-section">
                <h2>Testimonios hola</h2>
                <div className="testimonials-container">
                    <div className="video-player">
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${currentVideo.id}`} // Video actual
                            title={currentVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="video-thumbnails">
                        {videos.slice(1).map((video) => ( // Muestra miniaturas (excepto el primero)
                            <div
                                key={video.id}
                                className="thumbnail"
                                onClick={() => handleThumbnailClick(video)} // Cambia el video al hacer clic
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} // Miniatura de YouTube
                                    alt={video.title}
                                />
                                 <h3>{video.title}</h3> 
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    export default Testimonials;