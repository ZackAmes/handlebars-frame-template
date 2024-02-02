const templateHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta property="og:title" content="Test frame" />
    <meta property="og:image" content="{{imgUrl}}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="{{imgUrl}}" />
    <meta property="fc:frame:button:1" content="test" />
    <meta property="fc:frame:post_url" content="{{url}}/frame" />

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

const frameHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta property="og:title" content="Test Frame" />
    <meta property="og:image" content="{{url}}/image/{{fid}}" />
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="{{url}}/image/{{fid}}" />
    <meta property="fc:frame:button:1" content="test" />
    <meta property="fc:frame:post_url" content="{{url}}/frame" />
  </head>
</html>
`;

module.exports = { templateHTML, frameHTML};