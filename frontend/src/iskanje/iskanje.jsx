import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './iskanje.css'
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const Iskanje = () => {
    const [izdelki, setIzdelki] = useState([]);
    const [iskalniNiz, setIskalniNiz] = useState('');
    const [sporocilo, setSporocilo] = useState('Vsi izdelki');
    const [naziv, setNaziv] = useState('');
    const [kolicina, setKolicina] = useState('');
    const [enota, setEnota] = useState('');
    const [lokacija, setLokacija] = useState('');
    const [urediIzdelekId, setUrediIzdelekId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        pridobiVseIzdelke();
    }, []);

    const pridobiVseIzdelke = async () => {
        try {
            const response = await axios.get('http://localhost:3000/storage');
            setIzdelki(response.data);
            setSporocilo('Vsi izdelki');
        } catch (error) {
            console.error('Napaka pri pridobivanju izdelkov:', error);
        }
    };

    const iskanjePoImenu = async () => {
        if (!iskalniNiz) {
            pridobiVseIzdelke();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/products/name/${iskalniNiz}`);
            setIzdelki(response.data);

            setSporocilo(`Iskanje po izdelku: ${iskalniNiz}`);
        } catch (error) {
            console.error('Napaka pri iskanju po imenu:', error);
            setSporocilo('Napaka pri iskanju po imenu');
        }
    };

    const iskanjePoLokaciji = async () => {
        if (!iskalniNiz) {
            pridobiVseIzdelke();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/products/location/${iskalniNiz}`);
            setIzdelki(response.data);

            setSporocilo(`Iskanje po lokaciji: ${iskalniNiz}`);
        } catch (error) {
            console.error('Napaka pri iskanju po lokaciji:', error);
            setSporocilo('Napaka pri iskanju po lokaciji');
        }
    };

    const pocisti = () => {
        setNaziv("");
        setKolicina("");
        setEnota("");
        setLokacija("");
    }
    const dodajIzdelek = async () => {
        try {
            const response = await axios.post('http://localhost:3000/storage', {
                "naziv": naziv,
                "kolicina": kolicina,
                "enota": enota,
                "lokacija": lokacija
            });
            console.log(response.data);
            pridobiVseIzdelke();
            pocisti();
        } catch (error) {
            console.error('Napaka pri registraciji:', error);
        }
    }

    const zacniUrejanje = (id) => {
        const izdelek = izdelki.find((item) => item.id === id);
        setNaziv(izdelek.naziv);
        setKolicina(izdelek.kolicina);
        setEnota(izdelek.enota);
        setLokacija(izdelek.lokacija);
        setUrediIzdelekId(id);
        setIsEditing(true);
    };

    const shraniUrejanje = async () => {
        try {
            await axios.put(`http://localhost:3000/storage/${urediIzdelekId}`, {
                naziv: naziv,
                kolicina: kolicina,
                enota: enota,
                lokacija: lokacija,
            });
            pridobiVseIzdelke();
            setIsEditing(false);
            setUrediIzdelekId(null);
            pocisti();
        } catch (error) {
            console.error('Napaka pri posodabljanju izdelka:', error);
            alert('Izdelek neuspešno posodobljen');
        }
    };

    const brisiIzdelek = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/storage/${id}`);
            console.log(response.data);
            pridobiVseIzdelke();
        } catch (error) {
            console.error('Napaka pri brisanju izdelka:', error);
        }
    }

    const odjava = () => {
        navigate("/");
    }

    const uporabniki = () => {
        navigate("/uporabniki");
    }

    return (
        <div>
            <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button variant="text" color='inherit' disableElevation>Shramba</Button>
                        <Button variant="text" color='inherit' disableElevation onClick={uporabniki}>Uporabniki</Button>
                        <Button variant="contained" color='error' sx={{ marginLeft: 'auto' }} disableElevation onClick={odjava}>Odjava</Button>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className='glavno'>
                <div className="two-thirds">
                    <Typography variant='h3'>Shramba</Typography>
                    <div className="search-container">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="iskanje"
                            label="Iskanje"
                            name="iskanje"
                            autoComplete="iskanje"
                            autoFocus
                            variant="outlined"
                            value={iskalniNiz}
                            onChange={(iskalniNiz) => setIskalniNiz(iskalniNiz.target.value)}
                        />
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button onClick={iskanjePoImenu}>Iskanje po izdelku</Button>
                            <Button onClick={iskanjePoLokaciji}>Iskanje po lokaciji</Button>
                        </ButtonGroup>
                    </div>
                    <Typography variant="h5">
                        {sporocilo}
                    </Typography>
                    {izdelki.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Naziv</TableCell>
                                        <TableCell>Količina</TableCell>
                                        <TableCell>Enota</TableCell>
                                        <TableCell>Lokacija</TableCell>
                                        <TableCell>Upravljaj</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {izdelki.map((izdelek) => (
                                        <TableRow key={izdelek._id}>
                                            <TableCell >{izdelek.naziv}</TableCell>
                                            <TableCell>{izdelek.kolicina}</TableCell>
                                            <TableCell>{izdelek.enota}</TableCell>
                                            <TableCell>{izdelek.lokacija}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text" aria-label="text button group">
                                                    <Button variant="text" endIcon={<EditRoundedIcon />} onClick={() => zacniUrejanje(izdelek.id)}></Button>
                                                    <Button variant="text" startIcon={<DeleteIcon />} onClick={() => brisiIzdelek(izdelek.id)}></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="h5" color="red">
                            <br />
                            Ni izdelka, ki bi ustrezal iskanju
                        </Typography>
                    )}
                </div>
                <div className="one-third">
                    <Typography variant="h3">
                        {isEditing ? 'Uredi izdelek' : 'Dodaj izdelek'}
                    </Typography>
                    <Box component="form">
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="naziv"
                            label="Naziv"
                            name="naziv"
                            autoFocus
                            value={naziv} onChange={(e) => setNaziv(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="kolicina"
                            label="Količina"
                            id="kolicina"
                            value={kolicina} onChange={(e) => setKolicina(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="enota"
                            label="Enota"
                            id="enota"
                            value={enota} onChange={(e) => setEnota(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="lokacija"
                            label="Lokacija"
                            id="lokacija"
                            value={lokacija} onChange={(e) => setLokacija(e.target.value)}
                        />
                        <Button variant="outlined"
                            onClick={isEditing ? shraniUrejanje : dodajIzdelek}
                        >
                            {isEditing ? 'Shrani spremembe' : 'Dodaj izdelek'}
                        </Button>
                    </Box>
                </div>
            </div >
        </div>
    );
};

export default Iskanje;
