# Update the VARIANT arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG VARIANT=12
FROM node:${VARIANT}-alpine

WORKDIR /maixephoangthienphat.com-api

COPY package*.json ./
RUN yarn

ADD . /maixephoangthienphat.com-api

RUN yarn build

RUN ls -la

CMD ["yarn", "start"]
EXPOSE 5432