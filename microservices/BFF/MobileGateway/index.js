const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());


app.get('/users/login/:email::geslo', async (req, res) => {
    const response = await axios.get(`http://localhost:5102/api/login/${req.params.email}:${req.params.geslo}`);
    res.send(response.data);
});

app.get('/products', async (req, res) => {
    const response = await axios.get('http://localhost:8081/products');
    res.send(response.data);
});

app.get('/products/name/:izdelek', async (req, res) => {
    const response = await axios.get(`http://localhost:8081/products/name/${req.params.izdelek}`);
    res.send(response.data);
});

app.get('/products/location/:lokacija', async (req, res) => {
    const response = await axios.get(`http://localhost:8081/products/location/${req.params.lokacija}`);
    res.send(response.data);
});

app.post('/storage', async (req, res) => {
    const response = await axios.post('http://localhost:8080/shramba', req.body);
    res.send(response.data);
})

app.put('/storage/:id', async (req, res) => {
    const response = await axios.put(`http://localhost:8080/shramba/${req.params.id}`, req.body);
    res.send(response.data);
});

app.delete('/storage/:id', async (req, res) => {
    const response = await axios.delete(`http://localhost:8080/shramba/${req.params.id}`);
    res.send(response.data);
});

app.post('/storage', async (req, res) => {
    const response = await axios.post('http://quarkus/storage', req.body);
    res.send(response.data);
});


app.listen(port, () => {
    console.log(`Web gateway listening at http://localhost:${port}`);
});  