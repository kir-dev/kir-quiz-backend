FROM node:18-alpine

RUN apk update && apk upgrade && apk add bash

WORKDIR /app

COPY . .

RUN npm install --frozen-lockfile

RUN npm run build

CMD  ["node", "dist/main"]
