const express = require("express");
const exphbs = require('express-handlebars');
const Handlebars = require("handlebars");
const helpers = require("./lib/helpers");

const { createCanvas } = require('canvas');

const {
    FrameRequest,
    getFrameMessage,
    getFrameHtmlResponse,
} =require('@coinbase/onchainkit');

const app = express();

var hbs = exphbs.create({
    helpers      : helpers,

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        'views/'
    ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const port = process.env.PORT || 3001;
const url = "https://handlebars-puppeteer-frame-production.up.railway.app";



app.get('/', async (req, res) => {
   // let {logoUrl, title, tags, path, bgUrl} = req.query;
    const body = await req.body;

    res.render('page', {
        url: url
        }
    );
})

app.post('/frame', async (req, res) => {

    console.log(req.body)
    let body = await req.body;
    let fid = body.untrustedData.fid

    res.render('frame', {
        url, fid
    });
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});