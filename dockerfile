# ===== STAGE 1: Build =====
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npmjs.org
RUN yarn install --frozen-lockfile --production=false

COPY . .

# Build Next.js app
RUN yarn build && yarn postbuild \
  && yarn cache clean \
  && rm -rf /root/.cache /usr/local/share/.cache /tmp/*

# ===== STAGE 2: Runtime =====
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# انسخ فقط الملفات الجاهزة للتشغيل
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
