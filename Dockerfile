FROM node:16-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean — force

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]