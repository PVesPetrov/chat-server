import Token from '../../db/schemas/Token';
import User from '../../db/schemas/User';

export default (req, res, next) => {
  console.log(req.params.token);
  Token.findOne({ token: req.params.token })
    .then(token => {
      User.findOne({ _id: token.userId }).then(user => {
        if (!user) {
          return res.status(404).send({
            type: 'not-verified',
            msg:
              'We were unable to find a valid token. Your token my have expired.'
          });
        }
        if (user.verified) {
          return res.send({
            type: 'already-verified',
            msg: 'This user has already been verified.'
          });
        }
        user.verified = true;
        user.save(err => {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.sendFile('./confirmPage.html', { root: __dirname });
          // res.send('The account has been verified. Please, log in');
        });
      });
    })
    .catch(err => next(err));
};
