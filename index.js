const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

// APP
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

app.set('views', './views');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mini Messageboard',
    messages,
  });
});

app.get('/new', (req, res) => {
  res.render('form', { heading: 'New Message' });
});

app.post('/new', (req, res) => {
  const { author, message } = req.body;

  messages.push({
    text: message,
    user: author,
    added: new Date(),
  });

  res.redirect('/');
});

// SERVER
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
