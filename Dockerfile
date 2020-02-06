# => Build container
FROM node:alpine as builder

WORKDIR /app

ENV http_proxy=http://172.25.30.117:6060
ENV https_proxy=http://172.25.30.117:6060

RUN apk add --no-cache python make g++

COPY package.json .
COPY yarn.lock .

RUN yarn install --proxy http://172.25.30.117:6060

COPY . .

RUN yarn build

# => Run container
FROM nginx:1.15.2-alpine

ENV http_proxy=http://172.25.30.117:6060
ENV https_proxy=http://172.25.30.117:6060

# Add bash
RUN apk add --no-cache bash

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY ./.env .

# Make our shell script executable
RUN chmod +x env.sh

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
