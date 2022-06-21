const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productRoutes = require('./product.js')
const categoriesRoutes = require('./categories.js')
const manufacturerRoutes = require('./manufacturer')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/api/product', productRoutes)
router.use('/api/categories', categoriesRoutes)
router.use('/api/manufacturer', manufacturerRoutes)

module.exports = router;
