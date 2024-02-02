
const express = require("express");
const generateImage = require("./utils/generateImage");
const { getCompiledHTML, getCompiledFrame } = require("./utils/compileTemplate");

const {
    FrameRequest,
    getFrameMessage,
    getFrameHtmlResponse,
  } =require('@coinbase/onchainkit');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;
const url = "https://handlebars-puppeteer-frame-production.up.railway.app";

app.get('/', async (req, res) => {
   // let {logoUrl, title, tags, path, bgUrl} = req.query;
   const body = await req.body;
    const compiledHTML = getCompiledHTML(url, body);
    console.log(compiledHTML);
  
    res.status(200).send(compiledHTML);
})


app.get('/image/', async (req, res) => {
    try {
        
        const compiledHTML = getCompiledHTML(url);

        const image = await generateImage({
            width: req.query.width,
            height: req.query.height,
            content: compiledHTML
        });
        
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': `public, immutable, no-transform, s-max-age=2592000, max-age=2592000` });
        res.end(image);
    } catch(e) {
        console.log(e);
        res.status(500).send('Internal Server Error!')
    }
});

app.get('/image/:fid', async (req, res) => {
    try {
        const fid = await req.params.subroute;
        const body = await req.body;
        const compiledHTML = getCompiledHTML(url, fid);

        const image = await generateImage({
            width: req.query.width,
            height: req.query.height,
            content: compiledHTML
        });
        
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': `public, immutable, no-transform, s-max-age=2592000, max-age=2592000` });
        res.end(image);
    } catch(e) {
        console.log(e);
        res.status(500).send('Internal Server Error!')
    }
});

app.post('/frame', async (req, res) => {

    console.log(req.body)
    let body = await req.body;

    const imgUrl = ''
    
    const compiledFrame = getCompiledFrame(url, body);

    res.status(200).send(compiledFrame);
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});