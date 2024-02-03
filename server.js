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

    partialsDir: [
        'views/partials'
    ]
});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const port = process.env.PORT || 3001;
const url = "https://handlebars-frame.up.railway.app";


const initialFrameData = {
    imgData: {col:'red', fid:'Press Button to show fid'},
    buttons: {button1: true, label1: 'Show FID', button2: false, button3:false, button4:false},
    url
}

app.get('/', async (req, res) => {
    const body = await req.body;

    res.render('page', initialFrameData );
})

app.post('/frame', async (req, res) => {

    console.log(req.body)
    let body = await getFrameMessage(req.body);
    console.log(body)

    res.render('frame-response', {
        url, fid
    });
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});