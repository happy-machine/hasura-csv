FROM node:12.2.0-alpine
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . .

CMD [ "npm", "run", "docker"]
