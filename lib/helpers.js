const { createCanvas } = require("canvas");

exports.canvasUrl = function (col='red', fid) {
    // Create a canvas and get its 2D context
    const width= 640;
    const height = 360;
    const canvas = createCanvas();
    canvas.width = 640;
    canvas.height = 360;
    
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black';
    ctx.fillRect(0 , 0 , width , 20);
    ctx.fillRect(0 , height-20 , width , 20);
    ctx.fillRect(0 , 0 , 20 , height);
    ctx.fillRect(width-20 , 0 , 20 , height);


    ctx.fillStyle = col;
    ctx.fillRect(width/4 , 4*height/6 , width/2 , height/6);
    ctx.fillRect(width*.3  ,height/3  , 32  , 32);
    ctx.fillRect(width*.6  ,height/3  , 32  , 32);

    ctx.fillStyle = 'black';
    ctx.fillText(fid, 320, 180);

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Return the HTML with the data URL
    return dataURL;
}