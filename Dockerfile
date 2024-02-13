FROM node:18-alpine

RUN apk update && apk upgrade && apk add bash

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD  ["node", "dist/main"]
