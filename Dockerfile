FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY Client/package*.json /Client
RUN npm run install-Client --only=production


COPY server/package*.json /server
RUN npm run install-server --only=production

COPY Client/ Client/
RUN npm run build --prefix-Client

COPY server/ server/

USER node

CMD [ "npm","start","--prefix","server" ]

EXPOSE 3000