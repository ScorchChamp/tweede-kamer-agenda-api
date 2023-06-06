const axios = require('axios');
const express = require('express');

const app = express();
const port = 3000;

const agenda_url = "https://cdn.debatdirect.tweedekamer.nl/api/agenda"

app.get('/current', (req, res) => {
    axios.get(agenda_url)
        .then(response => response.data)
        .then(data => {
            let latestDebate = data.debates.find(debate => !debate.endedAt && debate.locationId =="plenaire-zaal"); 
            latestDebate = latestDebate || {}
            res.send(latestDebate);
        })
        .catch(error => console.log(error));
});

app.get('/agenda', (req, res) => {
    axios.get(agenda_url)
        .then(response => response.data)
        .then(data => {
            res.send(data);
        })
        .catch(error => console.log(error));
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));