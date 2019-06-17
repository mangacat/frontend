FROM mhart/alpine-node:12

# install apk dependencies
RUN apk update && apk add --virtual build-dependencies \
    build-base \
    gcc \
    wget \
    git \
    python

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-12

WORKDIR /app
COPY --from=0 /app .
COPY . .

EXPOSE 3000
CMD ["node", "__sapper__/build"]