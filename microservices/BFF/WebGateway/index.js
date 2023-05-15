const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get('/users', async (req, res) => {
    const response = await axios.get('http://host.docker.internal:5102/api/getAllUsers');
    res.send(response.data);
});

app.get('/users/login/:email::geslo', async (req, res) => {
    const response = await axios.get(`http://host.docker.internal:5102/api/login/${req.params.email}:${req.params.geslo}`);
    res.send(response.data);
});

app.post('/users/register', async (req, res) => {
    const response = await axios.post('http://host.docker.internal:5102/api/register', req.body);
    res.send(response.data);
});

app.delete('/users/delete/:email::geslo', async (req, res) => {
    const response = await axios.delete(`http://host.docker.internal:5102/api/delete/${req.params.email}:${req.params.geslo}`);
    res.send(response.data);
});

app.get('/products/name/:izdelek', async (req, res) => {
    const response = await axios.get(`http://host.docker.internal:8081/products/name/${req.params.izdelek}`);
    res.send(response.data);
});

app.get('/products/location/:lokacija', async (req, res) => {
    const response = await axios.get(`http://host.docker.internal:8081/products/location/${req.params.lokacija}`);
    res.send(response.data);
});

app.get('/storage', async (req, res) => {
    const response = await axios.get('http://host.docker.internal:8080/shramba');
    res.send(response.data);
})

app.post('/storage', async (req, res) => {
    const response = await axios.post('http://host.docker.internal:8080/shramba', req.body);
    res.send(response.data);
})

app.put('/storage/:id', async (req, res) => {
    const response = await axios.put(`http://host.docker.internal:8080/shramba/${req.params.id}`, req.body);
    res.send(response.data);
});

app.delete('/storage/:id', async (req, res) => {
    const response = await axios.delete(`http://host.docker.internal:8080/shramba/${req.params.id}`);
    res.send(response.data);
});


app.listen(port, () => {
    console.log(`Web gateway listening at http://localhost:${port}`);
});  