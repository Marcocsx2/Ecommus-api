import config from '../../config';
import jwt from 'jsonwebtoken';

export const verifyRefreshToken = (refreshToken) =>
  new Promise((resolve, reject) => {
    jwt.verify(refreshToken, config.secrets_refresh.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
