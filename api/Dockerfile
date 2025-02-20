FROM oven/bun:1 AS base

# WORKDIR /src

COPY package.json .

RUN bun i

COPY . .

CMD ["bun", "src/app.ts"]

EXPOSE 3101