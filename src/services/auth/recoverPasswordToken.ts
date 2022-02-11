import jwt from 'jsonwebtoken';
import config from '../../config';

export const recoverPasswordToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets_recover.jwt, {
    expiresIn: config.secrets_recover.jwtExp,
  });
};
