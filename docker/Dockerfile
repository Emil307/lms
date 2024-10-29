FROM registry.addamant-work.ru/infrastructure/frontend-dockerfile:latest AS base
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME 0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
RUN export NEXT_SHARP_PATH=/app/node_modules/sharp

# COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static
COPY --chown=nextjs:nodejs ./public ./public

RUN mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
