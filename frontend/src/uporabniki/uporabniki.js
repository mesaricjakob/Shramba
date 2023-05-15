import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './uporabniki.css'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Iskanje = () => {
    const [uporabniki, setUporabniki] = useState([]);
    const navigate = useNavigate();
    const [geslo, setGeslo] = useState('');
    const [posta, setPosta] = useState('');
    const [stilPotrdila, setStilPotrdila] = useState({visibility: "hidden"});

    useEffect(() => {
        pridobiVseUporabnike();
    }, []);

    const pridobiVseUporabnike = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users');
            setUporabniki(response.data);
        } catch (error) {
            console.error('Napaka pri pridobivanju uporabnikov:', error);
        }
    };


    const brisiUporabnika = async (geslo) => {
        try {
            const response = await axios.delete(`http://localhost:3000/users/delete/${posta}:${geslo}`);
            console.log(response.data);
            if(response.data)
            pridobiVseUporabnike();
            setStilPotrdila({visibility: "hidden"});
            setGeslo('');
        } catch (error) {
            console.error('Napaka pri brisanju izdelka:', error);
        }
    }

    const odjava = () => {
        navigate("/");
    }

    const shramba = () => {
        navigate("/iskanje");
    }

        const odpriPotrdilo = async (posta) => {
            setPosta(posta);
            setStilPotrdila({visibility: "visible"});
    }

    return (
        <div className="glavno">
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button variant="text" color='inherit' disableElevation onClick={shramba}>Shramba</Button>
                        <Button variant="text" color='inherit' disableElevation>Uporabniki</Button>
                        <Button variant="contained" color='error' sx={{ marginLeft: 'auto' }} disableElevation onClick={odjava}>Odjava</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className='two-thirds'>
                <Typography variant='h3'>Uporabniki</Typography>
                <br />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ime</TableCell>
                                <TableCell>Priimek</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Geslo</TableCell>
                                <TableCell>Upravljaj</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uporabniki.map((uporabnik) => (
                                <TableRow key={uporabnik._id}>
                                    <TableCell >{uporabnik.ime}</TableCell>
                                    <TableCell>{uporabnik.priimek}</TableCell>
                                    <TableCell>{uporabnik.email}</TableCell>
                                    <TableCell>
                                        {`${uporabnik.geslo.charAt(0)}${'*'.repeat(uporabnik.geslo.length - 2)}${uporabnik.geslo.charAt(uporabnik.geslo.length - 1)}`}
                                    </TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <Button variant="text" startIcon={<DeleteIcon />} onClick={(e) => {
                                                odpriPotrdilo(uporabnik.email);
                                            }}>
                                            </Button>

                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='one-third' style={stilPotrdila}>
                <Typography variant='h3'>Potrdi izbris</Typography>
                <Typography variant='h5'>Vnesi geslo za potrditev izbrisa</Typography>
                <Box component="form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="geslo"
                            label="Geslo"
                            name="geslo"
                            autoFocus
                            value={geslo} 
                            onChange={(geslo) => setGeslo(geslo.target.value)}
                        />
                <Button variant="text" onClick={(e) => {
                    brisiUporabnika(geslo);
                }}>
                    Potrdi izbris
                </Button>
                </Box>

            </div>
        </div>
    );
};

export default Iskanje;
