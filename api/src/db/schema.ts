import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  text,
  primaryKey,
} from "drizzle-orm/pg-core"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from 'postgres';

const postgres_connections = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`);

export const db = drizzle(postgres_connections)

export const image = pgTable("image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  alt: text("alt"),
  url: text("url"),
})

export type Image = typeof image.$inferSelect