const templateHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
  </head>
  <body id="body">
    <main>
      <div class="title">{{title}}</div>
      <div>
        {{#if fid}}
          <p>{{fid}}</p>
        {{/if}}
      </div>
    </main>
  </body>
</html>
`;


module.exports = { templateHTML};