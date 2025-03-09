import React from 'react';
    import MotivacionalVideo from '../components/MotivacionalVideo';
    import { Container, Typography } from '@mui/material';

    function Video() {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Video Motivacional</Typography>
                <MotivacionalVideo />
                <Typography variant="body1" style={{marginTop: '20px'}}>Una breve descripción del video.</Typography>
            </Container>
        );
    }

    export default Video;