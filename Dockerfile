FROM node:10

WORKDIR /bearchild

COPY . /bearchild

RUN npm install

RUN npm install -g nodemon

EXPOSE 3008

CMD ["npm", "start"]