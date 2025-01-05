FROM node:18 AS build

# create app directory
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# install dependencies
RUN npm run build

FROM nginx:1.23

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
