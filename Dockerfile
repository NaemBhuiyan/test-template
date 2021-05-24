FROM node:14-alpine AS build
RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

ARG HOST=0.0.0.0
ARG REACT_APP_BACKEND_URL=https://api.dev.vacci.se
ARG REACT_APP_API_VERSION=v1
ARG REACT_APP_SENTRY_DSN=
ARG REACT_APP_GOOGLE_TAG_MANAGER=GTM-P5S8LNL

COPY . .
RUN yarn build

FROM nginx:1.17.6-alpine as final
COPY nginx-default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/build.json /app/build.json
EXPOSE 80
