import React from 'react';
    import { AppBar, Toolbar, Button } from '@mui/material';
    import { Link } from 'react-router-dom';

    function Navbar() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Inicio</Button>
                    <Button color="inherit" component={Link} to="/video">Video</Button>
                    <Button color="inherit" component={Link} to="/testimonials">Testimonios</Button>
                    <Button color="inherit" component={Link} to="/information">Información</Button>
                    {/* Agrega más botones según sea necesario */}
                </Toolbar>
            </AppBar>
        );
    }

    export default Navbar;