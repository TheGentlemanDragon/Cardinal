var restify = require('restify');
var mongo = require('promised-mongo');
var helpers = require('./helpers.js');

var logRequest = helpers.logRequest;
var applySchema = helpers.applySchema;
var error = helpers.error;
var db = mongo('localhost/cardinal');

function authenticate (req, res, next) {
  if (!req.params.userId) {
    res.send(401, 'You must supply a \'userId\' to make a request.');
  }
  return next();
}

var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());
server.use(authenticate);
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
  var collection = db.collection(collectionName);

  // Get document array by query
  server.post('/' + collectionName + '/search',
    function (req, res, next) {

      collection
        .find(req.params)
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

      var result = applySchema(req.params, schema);

      if (result.error) {
        res.send(400, result.error);
        return next();
      }

      collection
        .insert(req.params)
        .then(function (doc) {
          res.send(201, doc);
        }, error);
      return next();
    }
  );

  // Get document by id
  server.get('/' + collectionName + '/:id',
    function (req, res, next) {
      req.params._id = mongo.ObjectId(req.params.id);
      delete req.params.id;
      console.log(req.params);

      collection
        .findOne(req.params)
        .then(function (doc) {
          res.send(200, doc);
        }, error);
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

      collection
        .findAndModify({
          query: { _id: mongo.ObjectId(req.params.id) },
          update: { '$set': req.params }
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
  _required: ['userId'],
  name: 'New Deck',
  userId: null,
  description: '',
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

createHandlers('decks', deckSchema);
createHandlers('templates', templateSchema);
createHandlers('cards', cardSchema);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});
