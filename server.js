
const express = require("express");
const exphbs = require('express-handlebars');
const Handlebars = require("handlebars");

const { createCanvas } = require('canvas');
const { templateHTML, frameHTML } = require("./template");


const {
    FrameRequest,
    getFrameMessage,
    getFrameHtmlResponse,
  } =require('@coinbase/onchainkit');

  
  const app = express();
  
  // Register a custom Handlebars helper for generating canvas with content
  var hbs = exphbs.create({
      helpers: {
          canvasUrl: function (col, fid) {
                // Create a canvas and get its 2D context
                const canvas = createCanvas(width, height);
                
                canvas.width=640;canvas.height=360;
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = col;
                ctx.fillRect(0,80,128,16);
                ctx.fillRect(16,0,32,32);
                ctx.fillRect(80,0,32,32);

                ctx.fillStyle = 'black';
                ctx.fillText(fid, 0, 0);
    
                // Convert the canvas to a data URL
                const dataURL = canvas.toDataURL();
    
                // Return the HTML with the data URL
                return dataURL;
          }
      }
  });
  
  // Configure Handlebars as the view engine
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

const port = process.env.PORT || 3001;
const url = "https://handlebars-puppeteer-frame-production.up.railway.app";



app.get('/', async (req, res) => {
   // let {logoUrl, title, tags, path, bgUrl} = req.query;
    const body = await req.body;

    const compiledHTML = Handlebars.compile(templateHTML)({
        url
      });

    console.log(compiledHTML);
  
    res.status(200).send(compiledHTML);
})

app.post('/frame', async (req, res) => {

    console.log(req.body)
    let body = await req.body;
    let fid = body.untrustedData.fid
    
    const compiledFrame = Handlebars.compile(templateFrame)({
        url, fid
    });

    res.status(200).send(compiledFrame);
});

app.listen(port, () => {
    console.log(`app listening at ${port}`)
});