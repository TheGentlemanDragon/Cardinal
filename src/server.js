var restify = require('restify');
var mongo = require('promised-mongo');

var db = mongo('localhost/cardinal');
var decks = db.collection('decks');


function authenticate (req, res, next) {
  return next();
}

function error (error) {
  res.send("  Error: " + error);
  return next();
}

var server = restify.createServer();

server.use(authenticate);

server.use(
  function crossOrigin (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

server.get('/decks',
  function getDecks (req, res, next) {
    decks
      .find()
      .toArray()
      .then(function (decks) {
        console.log('  getDecks');
        res.send(200, decks);
      }, error);
    return next();
  }
);

server.post('/decks', 
  function createDeck (req, res, next) {
    decks
      .insert({
        name: 'New Deck',
        description: '',
        templates: [],
        cards: []
      })
      .then(function (deck) {
        console.log('  createDeck:', deck._id);
        res.send(201, deck);
      }, error);
    return next();
  }
);

server.get('/decks/:id', 
  function getDeck (req, res, next) {
    decks
      .findOne({_id: mongo.ObjectId(req.params.id)})
      .then(function (deck) {
        console.log('  getDeck:', req.params.id);
        res.send(200, deck);
      }, error);
    return next();
  }
);

server.del('/decks/:id',
  function deleteDeck (req, res, next) {
    decks
      .remove({ _id: mongo.ObjectId(req.params.id) })
      .then(function (deck) {
        console.log('  deleteDeck:', req.params.id);
        res.send(204);
      }, error);
    return next();
  }
);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});