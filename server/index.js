var url = 'mongodb://localhost:27017/cardinal';

var restify = require('restify');
var ObjectId = require('mongodb').ObjectId
var helpers = require('./helpers.js');

var logRequest = helpers.logRequest;
var applySchema = helpers.applySchema;
var error = helpers.error;

var db;

function authenticate(req, res, next) {
  if (!req.params.userId) {
    res.send(401, 'You must supply a \'userId\' to make a request.');
  }
  return next();
}

function transformId(req, res, next) {
  if (req.params._id) {
    req.params._id = new ObjectId(req.params._id);
  }
  if (req.params.id) {
    req.params.id = new ObjectId(req.params.id);
  }
  return next();
}

function sendData(res, code) {
  return payload => res.send(code, payload);
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
function createHandlers(collectionName) {
  let schema = schemas[collectionName];

  function query(req, res, next) {
    db.collection(collectionName)
      .find(req.params)
      .toArray()
      // .then(docs => { console.log(docs); return docs; })
      .then(sendData(res, 200))
      .catch(error(res));
    return next();
  }

  function post(req, res, next) {
    var result = applySchema(req.params, schema);

    if (result.error) {
      res.send(400, result.error);
      return next();
    }

    db.collection(collectionName)
      .insert(req.params)
      // .then(docs => { console.log(docs); return docs; })
      .then(sendData(res, 201))
      .catch(error(res));
    return next();
  }

  function get(req, res, next) {
    req.params._id = req.params.id;
    delete req.params.id;

    db.collection(collectionName)
      .findOne(req.params)
      // .then(docs => { console.log(docs); return docs; })
      .then(sendData(res, 200))
      .catch(error(res));
    return next();
  }

  function update(req, res, next) {
    var result = applySchema(req.params, schema);

    if (result.error) {
      res.send(400, result.error);
      return next();
    }

    // Don't save the display id (string version of _id)
    delete req.params.id;

    db.collection(collectionName)
      .findAndModify(
        { _id: req.params._id }, // Query
        [],                      // Sort Order
        { '$set': req.params },  // Update
        { upsert: true, new: true }
      )
      // .then(docs => { console.log(docs); return docs; })
      .then(docs => res.send(200, docs.value))
      .catch(error(res));
    return next();
  }

  function del(req, res, next) {
    db.collection(collectionName)
      .remove({ _id: req.params.id })
      // .then(docs => { console.log(docs); return docs; })
      .then(sendData(res, 204))
      .catch(error(res));
    return next();
  }

  // Get document array by query
  server.get(`/${collectionName}`, query);

  // Create new document
  server.post(`/${collectionName}`, post);

  // Get document by id
  server.get(`/${collectionName}/:id`, get);

  // Update document by id
  server.post(`/${collectionName}/:id`, update);

  // Delete document by id
  server.del(`/${collectionName}/:id`, del);
}

let schemas = {
  cards: {
    _required: ['userId', 'templateId'],
    name: 'New Card',
    userId: null,
    templateId: '',
    data: {}
  },

  decks: {
    _required: ['userId'],
    name: 'New Deck',
    userId: null,
    description: '',
  },

  games: {
    _required: ['userId'],
    name: 'New Game',
    userId: null
  },

  templates: {
    _required: ['userId', 'gameId'],
    name: 'New Template',
    userId: null,
    gameId: '',
    elements: []
  }
};

// Wait for db connection, then create handlers
require('mongodb').MongoClient.connect(url).then(connection => {
  db = connection;
  createHandlers('games');
  createHandlers('templates');
  createHandlers('cards');
  createHandlers('decks');
});

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});
