import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Registracija = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [ime, setIme] = useState('');
    const [priimek, setPriimek] = useState('');
    const [geslo, setGeslo] = useState('');

    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                "_id": "",
                "email": email,
                "ime": ime,
                "priimek": priimek,
                "geslo": geslo  
            });
            console.log(response.data);
            navigate('/iskanje');
        } catch (error) {
            console.error('Napaka pri registraciji:', error);
            alert('Napačni podatki za registracijo');
        }
    };


    return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Registracija
              </Typography>
              <Box component="form" noValidate onSubmit={handleRegistration} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="ime"
                      required
                      fullWidth
                      id="ime"
                      label="Ime"
                      autoFocus
                      value={ime} onChange={(e) => setIme(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="priimek"
                      label="Priimek"
                      name="priimek"
                      autoComplete="family-name"
                      value={priimek} onChange={(e) => setPriimek(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="geslo"
                      label="Geslo"
                      type="geslo"
                      id="geslo"
                      autoComplete="new-password"
                      value={geslo} onChange={(e) => setGeslo(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Registracija
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Nazaj na prijavo
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
      );

    // return (
    //     <div>
    //         <h1>Registracija novega uporabnika</h1  >
    //         <form>
    //             <label>
    //                 Email:
    //                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 Ime:
    //                 <input type="text" value={ime} onChange={(e) => setIme(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 Priimek:
    //                 <input type="text" value={priimek} onChange={(e) => setPriimek(e.target.value)} />
    //             </label>
    //             <br />
    //             <label>
    //                 Geslo:
    //                 <input type="password" value={geslo} onChange={(e) => setGeslo(e.target.value)} />
    //             </label>
    //             <br />
    //             <button type="button" onClick={handleRegistration}>
    //                 Registracija
    //             </button>
    //         </form>
    //     </div>
    // );
};

export default Registracija;
