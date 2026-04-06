FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
ARG APP_COMMIT=unknown
ENV NEXT_PUBLIC_APP_COMMIT=${APP_COMMIT}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ARG APP_COMMIT=unknown
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_APP_COMMIT=${APP_COMMIT}
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
