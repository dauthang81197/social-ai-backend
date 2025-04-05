# Bắt đầu với hình ảnh Node.js chính thức
FROM node:20-alpine

# Cài đặt Yarn
RUN corepack enable

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và yarn.lock
COPY package.json yarn.lock ./

# Cài đặt các phụ thuộc bằng Yarn
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Biên dịch ứng dụng TypeScript
RUN yarn build

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 8000

# Chạy ứng dụng
CMD ["yarn", "start:prod"]
