var restify = require('restify');
var mongo = require('promised-mongo');
var helpers = require('./helpers.js');

var logRequest = helpers.logRequest;
var applySchema = helpers.applySchema;
var error = helpers.error;
var db = mongo('localhost/cardinal');

function authenticate (req, res, next) {
  return next();
}

var server = restify.createServer();

server.use(authenticate);
server.use(restify.bodyParser({ mapParams: false }));
server.use(
  function crossOrigin (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

// Create set of REST CRUD functions based on mongo DB collection name
function createHandlers(collectionName, schema) {
  var collection = db.collection(collectionName);

  // Get document array by query
  server.post('/' + collectionName + '/search',
    function (req, res, next) {
      logRequest(req);

      collection
        .find(req.body)
        .toArray()
        .then(function (docs) {
          res.send(200, docs);
        }, error);
      return next();
    }
  );

  // Create new document
  server.post('/' + collectionName,
    function (req, res, next) {
      logRequest(req);

      var result = applySchema(req.body, schema);

      if (result.error) {
        res.send(400, result.error);
        return next();
      }

      collection
        .insert(req.body)
        .then(function (doc) {
          res.send(201, doc);
        }, error);
      return next();
    }
  );

  // Get document by id
  server.get('/' + collectionName + '/:id',
    function (req, res, next) {
      logRequest(req);

      collection
        .findOne({ _id: mongo.ObjectId(req.params.id) })
        .then(function (doc) {
          res.send(200, doc);
        }, error);
      return next();
    }
  );

  // Update document by id
  server.post('/' + collectionName + '/:id',
    function (req, res, next) {
      logRequest(req);

      var result = applySchema(req.body, schema);

      if (result.error) {
        res.send(400, result.error);
        return next();
      }

      collection
        .findAndModify({
          query: { _id: mongo.ObjectId(req.params.id) },
          update: { '$set': req.body }
        })
        .then(function (doc) {
          res.send(200);
        }, error);
      return next();
    }
  );

  // Delete document by id
  server.del('/' + collectionName + '/:id',
    function (req, res, next) {
      logRequest(req);

      collection
        .remove({ _id: mongo.ObjectId(req.params.id) })
        .then(function (doc) {
          res.send(204);
        }, error);
      return next();
    }
  );
}

var deckSchema = {
  name: 'New Deck',
  description: ''
};

var templateSchema = {
  _required: ['deckId'],
  name: 'New Template',
  deckId: '',
  fields: []
};

var cardSchema = {
  _required: ['templateId', 'deckId'],
  name: 'New Card',
  templateId: '',
  deckId: '',
  data: {}
};

createHandlers('decks', deckSchema);
createHandlers('templates', templateSchema);
createHandlers('cards', cardSchema);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});