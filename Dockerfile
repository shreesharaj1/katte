# stage: 1
FROM node:12 as react-build
WORKDIR /app
COPY ./client ./

RUN yarn
RUN yarn build

FROM node:12 as react-backend
WORKDIR /back
COPY . ./
RUN npm install
RUN npm run start

# stage: 2 — the production environment
FROM nginx:1.16
COPY --from=react-backend /back/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]