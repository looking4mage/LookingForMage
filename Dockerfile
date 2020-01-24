FROM node:12-alpine as build

WORKDIR /app

COPY . .

RUN npm ci \
  && npm run test \
  && npm run build

FROM node:12-alpine

WORKDIR /app

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

RUN npm ci --only=production

ENTRYPOINT ["node", "/app/dist/app.js"]
