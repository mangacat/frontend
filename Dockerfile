FROM mhart/alpine-node:12

# install apk dependencies
RUN apk update && apk add --virtual build-dependencies \
    build-base \
    gcc \
    wget \
    git \
    python

# install node dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# build sapper
# RUN npm run build

EXPOSE 3000
CMD ["sh","-c", "npm run build && node __sapper__/build"]
# CMD ["npm""node", "__sapper__/build"]
