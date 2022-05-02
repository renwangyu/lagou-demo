
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  const htmlMarkup = renderToString(<App />);
  console.log(htmlMarkup);
  // <div data-reactroot=""><h1>hello react isomorphism</h1><button>点我</button></div>

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>isomorphism</title>
      </head>
      <body>
        <div id="root">${htmlMarkup}</div>
      </body>
    </html>
  `);
});

app.listen(4000, () => {
  console.log('listening at port 4000');
});

// <script src="public/bundle.js"></script>
