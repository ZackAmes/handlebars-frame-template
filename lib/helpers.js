const { createCanvas } = require("canvas");

exports.canvasUrl = function (fid) {
    // Create a canvas and get its 2D context
    const canvas = createCanvas(640, 360);
    
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
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