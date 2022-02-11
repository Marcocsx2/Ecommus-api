import config from '../../config';
import jwt from 'jsonwebtoken';
import messages from '../../utils/dictionary';

export const verifyRecoverToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets_recover.jwt, (err, payload) => {
      if (err)
        return resolve({
          err: true,
          message: messages('TOKEN_EXPIRED', 'token', process.env.LAN),
        });
      resolve(payload);
    });
  });
