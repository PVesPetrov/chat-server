import { Router } from 'express';
import login from '../controllers/login/login';
import signup from '../controllers/login/signup';
import confirmAccount from '../controllers/login/confirmAccount';

const router = Router();
router.use('/ping', (req, res, next) => {
  res.send('You say "ping", I say "pong"');
});
/**
 * Login
 * @params {email:String, password:String}
 * Check if such account exists and is veryfied and password is correct
 * returns user data
 */
router.post('/login', login);

/**
 *  Signup
 * @params {['User' model form src/db/schemas]}
 */
router.post('/signup', signup);
router.get('/confirmation/:token', confirmAccount);

export default router;
