var restify = require('restify');
var mongo = require('promised-mongo');
var helpers = require('./helpers.js');

var logRequest = helpers.logRequest;
var db = mongo('localhost/cardinal');

function authenticate (req, res, next) {
  return next();
}

function applySchema (obj, schema) {

  // Fill in absent fields with defaults
  var keys = Object.keys(schema);
  key = keys.pop();
  while (key) {
    obj[key] = obj[key] || schema[key];
    key = keys.pop();
  }

  delete obj._id;

  // Check that all required fields have values
  if ( '_required' in obj) {
    var missing = [];

    obj._required.forEach(function (item) {
      if (!(item in obj && obj[item])) {
        missing.push(item);
      }
    });

    delete obj._required;

    if (missing.length > 0) {
      return { error: 'Missing required fields:' + missing.join(', ') };
    }
  }
  return { error: false };
}

function error (error) {
  res.send("  Error: " + error);
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
  deckId: ''
};

var cardSchema = {
  _required: ['templateId', 'deckId'],
  name: 'New Card',
  templateId: '',
  deckId: ''
};

createHandlers('decks', deckSchema);
createHandlers('templates', templateSchema);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});