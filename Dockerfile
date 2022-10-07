FROM node:bullseye-slim as build-step
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
#install angular global
RUN npm install -g @angular/cli
RUN npm install 
COPY . .
RUN npm run build -noWatch
CMD ng serve --host 0.0.0.0
