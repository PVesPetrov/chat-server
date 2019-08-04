import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../../db/schemas/User';
import Token from '../../db/schemas/Token';
import transporter from '../../middleware/nodemailer';
import config from '../../../config';

export default (req, res, next) => {
  console.log({ body: req.body });
  // const user = new User(req.body);
  // const errors = user.validateSync();
  // console.log(user);
  // if (errors) {
  //   return res.status(400).send(errors);
  // }

  User.findOne({ email: req.body.email })
    .then(data => {
      // Make sure user doesn't already exist
      if (data)
        return res.status(400).send({
          msg:
            'The email address you have entered is already associated with another account.'
        });

      // Hash the password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res
            .status(500)
            .send({ Error: 'Internal Error.Please, try again.' });
        } else {
          console.log('before saving the user', req.body);
          req.body.password = hash;
          User.create(req.body)
            .then(newUser => {
              const token = new Token({
                userId: newUser._id,
                token: crypto.randomBytes(16).toString('hex')
              });

              // Save the verification token
              token.save(function(err) {
                if (err) {
                  return res.status(500).send({ msg: err.message });
                }

                // Send the email
                const mailOptions = {
                  from: config.email.user,
                  to: newUser.email,
                  subject: 'Account Verification Token',
                  text:
                    'Hello,' +
                    newUser.firstName +
                    newUser.lastName +
                    '\n\n' +
                    'Please verify your account by clicking the link: \nhttp://' +
                    req.headers.host +
                    '/confirmation/' +
                    token.token +
                    '.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                  if (err) {
                    return res.status(500).send({ msg: err.message });
                  }
                  res
                    .status(200)
                    .send(
                      'A verification email has been sent to ' +
                        newUser.email +
                        '.'
                    );
                });
              });
            })
            .catch(err => next(err));
        }
      });
    })
    .catch(err => next(err));
};
