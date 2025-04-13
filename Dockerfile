# Bắt đầu với hình ảnh Node.js chính thức
FROM node:18-alpine

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 8000

# Chạy ứng dụng
CMD ["node", "dist/src/main.js"]
