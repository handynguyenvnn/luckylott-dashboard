### 1st STAGE ###
FROM node:12.18 AS nodejs
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install @angular/cli
RUN npm install caniuse-lite@latest --save
RUN ./node_modules/@angular/cli/bin/ng build --configuration=production --outputHashing=all --output-path=dist/source

### 2nd STAGE: Run ###
FROM nginx:1.18
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=nodejs /usr/src/app/dist/source/. /usr/share/nginx/html
