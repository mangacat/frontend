FROM mhart/alpine-node:12

# install python
RUN apk add --update \
    python 
  && rm -rf /var/cache/apk/*

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

# build sapper
RUN npm run build

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