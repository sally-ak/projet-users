const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Middleware pour générer des ID numériques
router.db._.mixin({
  insert: function (collection, doc) {
    doc.id = collection.length + 1; // Générer un ID auto-incrémenté
    collection.push(doc);
    return doc;
  }
});

server.use(middlewares);
server.use(router);

server.listen(5000, () => {
  console.log("JSON Server is running on http://localhost:5000");
});
