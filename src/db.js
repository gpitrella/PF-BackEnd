require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/techmarket`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Product,
  Categories,
  Manufacturer,
  Review,
  State,
  User,
  Useraddress,
  Comments,
  Purchase_order,
  Favorites,
  Role,
  Branch_office,
} = sequelize.models;

// Associations
// Product.hasMany(Reviews);
Product.belongsToMany(Categories, { through: "product_category" });
Categories.belongsToMany(Product, { through: "product_category" });

Product.belongsToMany(Manufacturer, { through: "product_manufacturer" });
Manufacturer.belongsToMany(Product, { through: "product_manufacturer" });

Product.belongsToMany(Review, { through: "product_review" });
Review.belongsToMany(Product, { through: "product_review" });

User.belongsToMany(Review, {through:"review_user"})
Review.belongsToMany(User, {through:"review_user"})

User.belongsToMany(Favorites, { through: "user_favorites" });
Favorites.belongsToMany(User, { through: "user_favorites" });

Favorites.belongsToMany(Product,{through:"favorite_product"})
Product.belongsToMany(Favorites,{through:"favorite_product"})

User.belongsToMany(Comments, {through: "user_comment"})
Comments.belongsToMany(User,{through:"user_comment"})

Role.belongsToMany(User, { through: "user_role", foreignKey: "role_id" });
User.belongsToMany(Role, { through: "user_role", foreignKey: "userId" });

Product.belongsToMany(Comments, { through: "product_comment"});
Comments.belongsToMany(Product, { through: "product_comment"});

User.belongsToMany(Useraddress, { through: "user_address" });
Useraddress.belongsToMany(User, { through: "user_address" });

Useraddress.belongsTo(State);
State.belongsToMany(Useraddress, { through: "address_state" }); // tendria que ser "belongsTo"

Product.belongsToMany(Purchase_order, {through: "product_order"});
Purchase_order.belongsToMany(Product, {through: "product_order"});

User.belongsToMany(Purchase_order,{through:"user_order"});
Purchase_order.belongsToMany(User, {through:"user_order"});

Branch_office.hasMany(Purchase_order);
Purchase_order.belongsTo(Branch_office);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
