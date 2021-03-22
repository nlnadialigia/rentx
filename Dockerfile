FROM node

WORKDIR /user/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3380

CMD [ "npm", "run", "dev" ]