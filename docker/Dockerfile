FROM node:12.13-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY yarn*.lock ./

# Install node_modules
RUN yarn install --only=production

# Install PM2 globally
#RUN yarn global add pm2

# Copy existing application directory contents
COPY . .

EXPOSE 80
CMD [ "yarn", "run", "build:start_prod" ]

# Run pm2 is not neccesary, only need if you run multiple node app in 1 docker
#CMD [ "yarn", "run", "build:start_prod" ]
