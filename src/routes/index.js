const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRoutes = require("./product.js");
const categoriesRoutes = require("./categories.js");
const manufacturerRoutes = require("./manufacturer");
const paginatedRoutes = require("./paginated.js");
// Middlewares
const auth = require('../middlewares/auth');
// Controllers
const AuthController = require('../controllers/AuthController');
//const PostController = require('./controllers/PostController');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

router.use("/api/product", auth, productRoutes);
router.use("/api/categories", categoriesRoutes);
router.use("/api/manufacturer", manufacturerRoutes);
router.use("/api/paginated", paginatedRoutes);

module.exports = router;
