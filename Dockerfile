FROM node:20.18.0-alpine3.20

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app