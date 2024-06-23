FROM node:18-alpine

#### make the 'app' folder the current working directory
WORKDIR /app

#### copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

#### install angular cli
RUN npm install -g @angular/cli

#### install project dependencies
RUN npm install

#### copy things
COPY . .

#### generate build
RUN npm run build

#### port to expose
EXPOSE 4200

#### start container commands
CMD ["npm", "run", "cstart"]