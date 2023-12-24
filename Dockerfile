FROM node:lts-alpine
ENV NODE_ENV=production \TOKEN="" \GUILD_ID="" \CLIENT_ID="" \CHANNEL_LINK="" \ WELCOME_CHANNEL_ID="" \ ADMIN_CHANNEL_ID=""
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --only-prod --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["node", "src/index.js"]
