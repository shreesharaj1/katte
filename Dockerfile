# stage: 1
FROM node:12 as react-build
WORKDIR /app
COPY ./client ./

RUN yarn
RUN yarn build

COPY . ./
RUN npm install
CMD ["npm",  "run",  "start:server"]

# stage: 2 — the production environment
FROM nginx:1.16
COPY --from=react-build /app/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]