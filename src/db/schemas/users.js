import { model, Schema } from 'mongoose';
import { isLength, isEmail } from 'validator';

const User = new Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    validate: {
      validator: v => !isEmpty(v),
      message: ({ value }) => `${value} is not a valid first name.`
    }
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: v => !isEmpty(v),
      message: ({ value }) => `${value} is not a valid last name.`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: v => isEmail(v),
      message: ({ value }) => `${value} is not a valid email.`
    }
  },
  nickname: {
    type: String,
    required: [true, 'Nickname is required'],
    validate: {
      validator: v => !isEmpty(v),
      message: ({ value }) => `${value} is not a valid nickname.`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: v => isLength(v, { min: 6, max: 14 }),
      message: ({ value }) => `${value} is not a valid password.`
    }
  }
});

export default model('User', User);
