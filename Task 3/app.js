const express = require("express");
const cors = require('cors');
const app = express();
const http = require('http');
const path = require('path');
const httpServer = http.Server(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const QueryEngine = require('@comunica/query-sparql').QueryEngine;
const engine = new QueryEngine();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/movies', (req, res) => {
    let input_url = req.query.url;
    console.log("input url: ", input_url);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, 'index.html'));
    handle_query(input_url);
});

async function handle_query(input_url) {
    engine.queryBindings(`
        PREFIX schema: <https://schema.org/>
        SELECT ?name ?image ?description ?datePublished
        WHERE {
            ?movie a schema:Movie.
            ?movie schema:name ?name.
            ?movie schema:image ?image.
            ?movie schema:description ?description.
            ?movie schema:datePublished ?datePublished.
        }
    `, {
        sources: [input_url],
    }).then(function (bindingsStream) {
        bindingsStream.on('data', function (data) {
            let obj = {
                "name": data.get('name').value,
                "image": data.get('image').value,
                "description": data.get('description').value,
                "datePublished": data.get('datePublished').value
            };
            io.emit('update', {'message': obj});
        });
        // Handle end of stream and errors...
    }).catch(error => {
        console.error(error);
        // Handle error
    });
}

httpServer.listen(port, () => console.log("Server is running on port " + port));
