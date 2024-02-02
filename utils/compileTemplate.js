const Handlebars = require("handlebars");

const { templateHTML } = require("./template");


function getCompiledHTML({untrustedData, trustedData}) {
  let fid;
  if(untrustedData && trustedData){
    
    fid = untrustedData.fid;
  
  }
  
  return Handlebars.compile(templateHTML)({
    fid
  });
  
}

module.exports = { getCompiledHTML };