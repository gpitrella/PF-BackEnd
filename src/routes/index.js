const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRoutes = require("./product");
const categoriesRoutes = require("./categories");
const manufacturerRoutes = require("./manufacturer");
const commentsRoutes = require("./comments");

// Middlewares
const auth = require('../middlewares/auth');

// Policies
const AdminPolicy = require('../policies/AdminPolicy');

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

//? ruta dashboard Admin protegida con token y usuario admin
router.get('/api/admin', auth, AdminPolicy.show);

//? ruta protegida con token y usuario admin
//router.use('/api/product', auth, AdminPolicy.show, productRoutes)

router.use('/api/product', productRoutes)
router.use('/api/categories', categoriesRoutes)
router.use('/api/manufacturer', manufacturerRoutes)
router.use('/api/comments', commentsRoutes)

module.exports = router;
