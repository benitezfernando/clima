FROM node:16.17.0-alpine3.16

WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "/app/src/start.js"]
