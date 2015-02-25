var restify = require('restify');
var mongo = require('promised-mongo');

var db = mongo('localhost/cardinal');
var decks = db.collection('decks');


function authenticate (req, res, next) {
  console.log('In Auth');
  return next();
}

function error (error) {
  res.send("An error has occured: " + error);
  return next();
}

function getDecks (req, res, next) {
  decks
    .find()
    .toArray()
    .then(function (decks) {
      console.log('getDecks:');
      res.send(decks);
    }, error);
  return next();
}

function getDeck (req, res, next) {
  decks
    .findOne({_id: mongo.ObjectId(req.params.id)})
    .then(function (deck) {
      console.log('getDeck:');
      res.send(deck);
    }, error);
  return next();
}

function createDeck (req, res, next) {
  decks
    .insert({
      name: 'New Deck',
      description: '',
      templates: [],
      cards: []
    })
    .then(function (deck) {
      console.log('createDeck:');
      res.send(deck);
    }, error);
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

server.post('/decks', createDeck);
server.get('/decks/:id', getDeck);
server.get('/decks', getDecks);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});