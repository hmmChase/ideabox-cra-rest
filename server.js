const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  });
}

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () =>
  console.log('Listening on http://localhost:' + app.get('port'))
);

app.get('/api/v1/ideas', (req, res) => {
  database('ideas')
    .select()
    .then(ideas => res.status(200).json(ideas))
    .catch(error => res.status(500).json({ error }));
});

app.get('/api/v1/ideas/:id', (req, res) => {
  const { id } = req.params;

  database('ideas')
    .select()
    .where('id', id)
    .then(idea =>
      idea.length
        ? res.status(200).json(idea)
        : res.status(404).json({ error: `Idea ID ${id} not found.` })
    )
    .catch(error => res.status(500).json({ error }));
});

app.post('/api/v1/ideas', (req, res) => {
  const idea = req.body;

  for (let property of ['idea']) {
    idea[property]
      ? database('ideas')
          .insert(idea, ['id', 'idea', 'created_at', 'updated_at'])
          .then(idea => res.status(201).json(idea[0]))
          .catch(error => res.status(500).json({ error }))
      : res.status(422).json({ error: 'Missing idea.' });
  }
});

app.put('/api/v1/ideas/:id', (req, res) => {
  const { id } = req.params;
  const idea = req.body;

  for (let property of ['idea']) {
    idea[property]
      ? database('ideas')
          .select()
          .where('id', id)
          .update({ ...idea }, ['id', 'idea', 'created_at', 'updated_at'])
          .then(idea =>
            idea.length
              ? res.status(200).json(idea)
              : res.status(404).json({ error: `Idea ID ${id} not found.` })
          )
          .catch(error => res.status(500).json({ error }))
      : res.status(422).json({ error: 'Missing idea.' });
  }
});

app.delete('/api/v1/ideas/:id', (req, res) => {
  const { id } = req.params;

  database('ideas')
    .where('id', id)
    .del(['id'])
    .then(idea =>
      idea.length
        ? res.status(200).json({ success: `Idea ID ${id} deleted.` })
        : res.status(404).json({ error: `Idea ID ${id} not found.` })
    )
    .catch(error => res.status(500).json({ error }));
});

module.exports = app;
