FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env.docker .env
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]