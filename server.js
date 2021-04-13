// Dependencies
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const waitingList = [];
const table = [{
    name: 'Bob',
    phone: '555-5555',
    email: 'bob@bob.com',
    uniqueID: '1234'
}];

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

app.get('/api/tables', (req, res) => (res.json({table: table, waitingList: waitingList})));
// app.get('/api/tables', (req, res) => res.json(path.join(__dirname, 'tables.html')));

app.post('/api/reservations', (req, res) => {
    const newRequest = req.body;
    if(table.length < 5 ) {
        table.push(newRequest)
    }
    else {
        waitingList.push(newRequest);
    }
    return res.json(newRequest)
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));