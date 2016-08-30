var url = 'mongodb://localhost:27017/cardinal';

var restify = require('restify');
var mongo = require('mongodb').MongoClient.connect(url);
var ObjectId = require('mongodb').ObjectId
var helpers = require('./helpers.js');

var logRequest = helpers.logRequest;
var applySchema = helpers.applySchema;
var error = helpers.error;

function authenticate (req, res, next) {
  if (!req.params.userId) {
    res.send(401, 'You must supply a \'userId\' to make a request.');
  }
  return next();
}

function transformId (req, res, next) {
  if (req.params._id) {
    req.params._id = new ObjectId(req.params._id);
  }
  return next();
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());
server.use(authenticate);
server.use(transformId);
server.use(logRequest);
// server.use(
//   function crossOrigin (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
//     res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Credential');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     return next();
//   }
// );

// Create set of REST CRUD functions based on mongo DB collection name
function createHandlers(collectionName, schema) {

  // Get document array by query
  server.post('/' + collectionName + '/search',
    function (req, res, next) {
      mongo.then( db =>
        db.collection(collectionName)
          .find(req.params)
          .toArray()
        )
        .then( docs => res.send(200, docs) )
        .catch(error);
      return next();
    }
  );

  // Create new document
  server.post('/' + collectionName,
    function (req, res, next) {

      var result = applySchema(req.params, schema);

      if (result.error) {
        res.send(400, result.error);
        return next();
      }

      mongo.then( db =>
        db.collection(collectionName)
          .insert(req.params)
        )
        .then( docs => res.send(201, docs) )
        .catch(error);
      return next();
    }
  );

  // Get document by id
  server.get('/' + collectionName + '/:id',
    function (req, res, next) {
      req.params._id = req.params.id;
      delete req.params.id;

      mongo.then( db =>
        db.collection(collectionName)
          .findOne(req.params)
        )
        .then( docs => res.send(200, docs) )
        .catch(error);
      return next();
    }
  );

  // Update document by id
  server.post('/' + collectionName + '/:id',
    function (req, res, next) {

      var result = applySchema(req.params, schema);

      if (result.error) {
        res.send(400, result.error);
        return next();
      }

      mongo.then( db =>
        db.collection(collectionName)
          .findAndModify({
            query: { _id: req.params.id },
            update: { '$set': req.params }
          })
        )
        .then( docs => res.send(200, docs) )
        .catch(error);
      return next();
    }
  );

  // Delete document by id
  server.del('/' + collectionName + '/:id',
    function (req, res, next) {

      mongo.then( db =>
        db.collection(collectionName)
          .remove({ _id: req.params.id })
        )
        .then( docs => res.send(204, docs) )
        .catch(error);
      return next();
    }
  );
}

var gameSchema = {
  _required: ['userId'],
  name: 'New Game',
  userId: null
};

var templateSchema = {
  _required: ['userId', 'deckId'],
  name: 'New Template',
  userId: null,
  deckId: '',
  fields: [],
  elements: []
};

var cardSchema = {
  _required: ['userId', 'templateId', 'deckId'],
  name: 'New Card',
  userId: null,
  templateId: '',
  deckId: '',
  data: {}
};

var deckSchema = {
  _required: ['userId'],
  name: 'New Deck',
  userId: null,
  description: '',
};

createHandlers('games', gameSchema);
createHandlers('templates', templateSchema);
createHandlers('cards', cardSchema);
createHandlers('decks', deckSchema);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});
