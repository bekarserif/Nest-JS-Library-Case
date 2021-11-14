FROM node:14.17-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm i -g @nestjs/cli
RUN npm install --production --silent && mv node_modules ../
COPY . .
CMD npm start