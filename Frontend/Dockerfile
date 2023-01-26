FROM node:latest as front

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build --prod


FROM nginx:latest as router

COPY --from=front /app/dist/sae-alt-capt-elec /usr/share/nginx/html