FROM node:18-alpine

WORKDIR /app
COPY ../libs/entities/dist ../libs/entities/dist
COPY ./dist ./dist
COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile && yarn cache clean

EXPOSE 8000

CMD ["yarn", "start:prod"]
