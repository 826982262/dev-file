FROM node:16 as build
WORKDIR /
ADD ./swagger-manageter ./swagger-manageter
ADD ./swagger-manageter/.env ./swagger-manageter/.env
WORKDIR /swagger-manageter
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install

CMD [ "npm", "run", "start" ]
