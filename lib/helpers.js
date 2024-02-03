const { createCanvas } = require("canvas");

exports.canvasUrl = function (col='red', fid) {
    // Create a canvas and get its 2D context
    const canvas = createCanvas(640, 360);
    
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = col;
    ctx.fillRect(0,160,480,160);
    ctx.fillRect(16,0,32,32);
    ctx.fillRect(80,0,32,32);

    ctx.fillStyle = 'black';
    ctx.fillText(fid, 320, 180);

    // Convert the canvas to a data URL
    const dataURL = canvas.toDataURL();

    // Return the HTML with the data URL
    return dataURL;
}