const routerx = require('express-promise-router');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = routerx();


router.post('/login',userController.login);
router.post('/register', userController.register);
router.put('/update',userController.update);
router.get('/list',userController.list);
module.exports = router;