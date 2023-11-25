FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install
RUN npm run build

ENV PORT=4000

EXPOSE 4000

CMD ["npm", "start"]