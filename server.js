const express = require("express");
const exphbs = require('express-handlebars');
const helpers = require("./lib/helpers");


const {
    FrameRequest,
    getFrameMessage,
    getFrameHtmlResponse,
} =require('@coinbase/onchainkit');

const app = express();
app.use(express.json())

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

    const body = await req.body;
    
    let data = await getFrameMessage(body,  { NEYNAR_API_KEY: 'NEYNAR_API_DOCS' });
    console.log(data)

    let responseFrameData = {
        imgData: {col:'green', fid:body.untrustedData.fid ? body.untrustedData.fid : " err "},
        buttons: {button1: false, button2: false, button3:false, button4:false},
        url
    }

    res.render('frame-response', responseFrameData);
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});