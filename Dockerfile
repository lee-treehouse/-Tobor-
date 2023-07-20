FROM node:18.16.1

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "start"]