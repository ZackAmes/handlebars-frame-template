const Handlebars = require("handlebars");

const { templateHTML, frameTemplate, frameHTML } = require("./template");


function getCompiledHTML(url, body) {
  let fid = 'test';
  
  let imgUrl = 'https://picsum.photos/640/360'

  if(body.untrustedData){
    
    fid = body.untrustedData.fid;
    imgUrl = url + '/image/' + fid
  
  }
  
  return Handlebars.compile(templateHTML)({
    imgUrl, url, fid
  });
  
}

function getCompiledFrame(url, body) {
  let fid = 'no fid';
  if(body.untrustedData){
    
    fid = body.untrustedData.fid;
  
  }

  return frameResponse = Handlebars.compile(frameHTML)({
    url, fid
  })

}

module.exports = { getCompiledHTML, getCompiledFrame };