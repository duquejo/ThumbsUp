# install node
FROM node:18.16.0-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "run", "preview" ]  