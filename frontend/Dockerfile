FROM node:20-alpine

WORKDIR /frontend

COPY package*.json .

RUN npm i --silent

COPY . /frontend

EXPOSE 5173

CMD ["npm", "run", "dev"]
