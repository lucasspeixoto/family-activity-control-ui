FROM node:18-alpine

#### make the 'app' folder the current working directory
WORKDIR /app

#### copy 'package.json'
COPY package*.json ./

#### install angular cli
RUN npm install -g @angular/cli

#### install project dependencies
RUN npm install

#### copy things
COPY . .

#### generate build
RUN npm run build

#### run unit tests
RUN npm run test

#### port to expose
EXPOSE 4200

#### start container commands
CMD ["npm", "run", "cstart"]