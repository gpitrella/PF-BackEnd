const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRoutes = require('./videogame.js')
const genreRoutes = require('./genres.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', videogameRoutes)
router.use('/genres', genreRoutes)


module.exports = router;
