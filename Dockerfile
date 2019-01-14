FROM node:carbon-alpine
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 5000

CMD [ "npm", "start" ]