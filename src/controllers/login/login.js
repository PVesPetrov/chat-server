import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../../config';
import User from '../../db/schemas/User';
import { isEmail, isEmpty } from 'validator';

export default (req, res, next) => {
  const errors = [];
  console.log(req.body);
  !isEmail(req.body.email) && errors.push('Email is not valid.');
  isEmpty(req.body.password) && errors.push('Password is required.');

  if (errors.length) {
    return res.status(400).send(errors);
  }

  const { password, email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .send({ error: ['User with such email was not found.'] });
      }
      if (!user.verified) {
        return res.status(400).send({
          error: [
            'The account has not been verified. Please check your email for verification instructions.'
          ]
        });
      }
      console.log({ password, userPassword: user.password });
      bcrypt.compare(password, user.password).then(result => {
        if (result) {
          const token = jwt.sign(
            { firstname: user.firstname, lastname: user.lastname, email },
            config.jwt_secret,
            {
              expiresIn: '1m'
            }
          );
          res.send({
            data: [
              {
                firstName: user.firstName,
                lastName: user.lastName,
                nickName: user.nickName,
                token,
                email
              }
            ]
          });
        } else {
          res.status(400).send({ error: ['Incorrect password'] });
        }
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};
