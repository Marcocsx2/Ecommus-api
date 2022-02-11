import jwt from 'jsonwebtoken';
import config from '../../config';

export const refreshToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets_refresh.jwt, {
    expiresIn: config.secrets_refresh.jwtExp,
  });
};
