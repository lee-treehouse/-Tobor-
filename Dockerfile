FROM node:18.16.1-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./

RUN npm install

COPY src ./src

RUN npm run build

CMD ["npm", "start"]