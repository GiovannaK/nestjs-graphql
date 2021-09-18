FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./src .

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/main" ]