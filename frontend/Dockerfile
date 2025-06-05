FROM node:lts as build

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

