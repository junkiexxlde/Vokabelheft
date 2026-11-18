FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install --yes --no-install-recommends translate \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --omit=dev

COPY --chown=node:node . .

ENV NODE_ENV=production
EXPOSE 3007

USER node

CMD ["npm", "start"]
