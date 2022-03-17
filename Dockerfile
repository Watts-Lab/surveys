FROM node:16-bullseye

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY /src ./src
COPY .storybook ./.storybook
COPY /surveys /surveys


CMD ["npm", "start"]