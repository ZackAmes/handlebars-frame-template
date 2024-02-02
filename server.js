
const express = require("express");
const generateImage = require("./utils/generateImage");
const { getCompiledHTML } = require("./utils/compileTemplate");

const {
    FrameRequest,
    getFrameMessage,
    getFrameHtmlResponse,
  } =require('@coinbase/onchainkit');

const app = express();
app.use(express.json());

const port = 8080;


function generateFarcasterFrameMetaTag({ frame, imageUrl, postUrl, buttons }){
    // Default to vNext
    if (!frame) {
        frame = "vNext"
    }
    // Ensure there are at most four buttons
    if (buttons && buttons.length > 4) {
        throw new Error("Maximum of four buttons are allowed per frame.");
    }

    // Generate Open Graph tags for image, redirect, and buttons
    let metaTag = `<meta property="fc:frame" content="${frame ? frame : "vNext"}" />\n`;
    metaTag += `<meta property="fc:frame:image" content="${imageUrl}" />\n`;

    if (buttons) {
        buttons.forEach((button, index) => {
            metaTag += `<meta property="fc:frame:button:${index + 1}" content="${button}" />\n`;
        });
    }

    // post URL if exists
    if (postUrl) {
        metaTag += `<meta property="fc:frame:post_url" content="${postUrl}" /> \n`
    }

    return metaTag;
}

function frameGenerator(frameProps) {

    const metaTag = generateFarcasterFrameMetaTag(frameProps);

    const html = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Farcaster x Express Frame template</title>
                <meta property="og:title" content="Sam Broner's express farcaster frame template" />
                <meta property="og:image" content="https://example.com/img.png" />
                ${metaTag}
            </head>
        </html>
    `;
    return html;
}



app.get('/', async (req, res) => {
   // let {logoUrl, title, tags, path, bgUrl} = req.query;
   const body = await req.body;
    const compiledHTML = getCompiledHTML({untrustedData: body.untrustedData, trustedData: body.trustedData});
  
    res.status(200).send(compiledHTML);
  })
  
  
  app.get('/ogimage', async (req, res) => {
    try {
      
    const body = await req.body;
            const compiledHTML = getCompiledHTML({untrustedData: body.untrustedData, trustedData: body.trustedData});
    
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
  

app.get('/frame', (req, res) => {

    const frameProps = {
        imageUrl: 'https://i.imgur.com/osEKmhB.png',
        buttons: ['get', 'button2'],
    };

    res.status(200).send(frameGenerator(frameProps));
});

app.post('/frame', (req, res) => {

    console.log(req.body)

    const frameProps = {
        imageUrl:  'https://i.imgur.com/osEKmhB.png',
        buttons: ['post', 'button2'],

    };
    
    res.status(200).send(frameGenerator(frameProps));
});
app.listen(port, () => {
    console.log(`app listening at ${port}`)
  });