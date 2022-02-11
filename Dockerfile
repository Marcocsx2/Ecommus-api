FROM node:latest

WORKDIR /ecommus-aluka

COPY package*.json ./

RUN npm install --production

COPY ./.env ./


COPY ./dist ./dist

ENV NODE_ENV=production

CMD ["npm", "start"]