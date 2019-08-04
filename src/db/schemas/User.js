import { model, Schema } from 'mongoose';
import { isEmpty, isEmail } from 'validator';

const User = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    validate: {
      validator: v => !isEmpty(v),
      message: ({ value }) => `${value} is not a valid first name.`
    }
  },
  lastName: {
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
  nickName: {
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
      validator: v => !isEmpty(v),
      message: ({ value }) => `${value} is not a valid password.`
    }
  },
  verified: {
    type: Boolean,
    default: false
  }
});

export default model('User', User);
