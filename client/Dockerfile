# Etapa 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Variables de entorno para la API
ARG API_HOST=localhost
ARG API_PORT=8086
ARG API_BASE=/api/saludo

ENV VITE_API_HOST=${API_HOST}
ENV VITE_API_PORT=${API_PORT}
ENV VITE_API_BASE=${API_BASE}

RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

