### ON REQUEST FUNCIONANDO COM ROTAS E EXPRESS


const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express');
const app = express();
const cors = require('cors');
//https://expressjs.com/en/resources/middleware/cors.html
// https://github.com/banzeh/cielo/blob/a3625dd6795897c20aae386e2a894b82714e7312/cielo.test.js

admin.initializeApp();

app.use(cors({ origin: true }));

const db = admin.firestore();



exports.app = functions.https.onRequest(app);
// Expose Express API as a single Cloud Function:
// exports.widgets = functions.https.onRequest(app);

// var myMiddleware = function(req, res, next) {
//     console.log('myMiddleware')
//     next();
// }

app.use((req, res, next) => {
    console.log('myMiddleware')
    next();
});

// build multiple CRUD interfaces:
app.get('/bandeira/:id', async  (req, res) => {
    var retorno = await binBandeira(req.params.id)
    res.send(retorno)
    res.end();
});


app.post('/bandeira/:id', async  (req, res) => {
    var retorno = await binBandeira(req.params.id)
    res.send(retorno)
    res.end();
});

// app.post('/', (req, res) => res.send(Widgets.create()));
app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
app.get('/', (req, res) => res.send(Widgets.list()));




## REFERENCIAS

** IMPORTAÇÃO DE MODULOS VIDEO SPANHOL
https://www.youtube.com/watch?v=EatuQDKsWpY





