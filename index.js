//? Ecommerce Techmarket *****

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 3001;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Listening at port:${PORT} ...`); // eslint-disable-line no-console
  });
});