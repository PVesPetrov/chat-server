import nodemailer from 'nodemailer';
import config from '../../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: config.email
});

export default transporter;
