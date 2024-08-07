import {
  pgTable,
  integer,
  timestamp,
  text,
  boolean
} from "drizzle-orm/pg-core"

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from 'postgres';

const postgres_connections = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`);

export const db = drizzle(postgres_connections)

export const project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  subtitle: text("subtitle"),
  description: text("description"),
  tags: text("tags"),
  link: text("link")
})

export const skill = pgTable("skill", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  image_id: text("image_id").references(() => image.id),
  highlighted: boolean("highlighted").$defaultFn(() => false),
  is_hobbie: boolean("is_hobbie").$defaultFn(() => false)
})


export const image = pgTable("image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  alt: text("alt"),
  url: text("url"),
})

export const project_image = pgTable("project_image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  project_id: text("project_id").references(() => project.id),
  image_id: text("image_id").references(() => image.id),
})

export const blog = pgTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title"),
  content: text("content"),
  date: timestamp("date", { mode: "date" }),
  header_image_id: text("header_image_id").references(() => image.id),
  likes: integer("likes"),
  dislikes: integer("dislikes"),
  highlighted: boolean("highlighted").$defaultFn(() => false)
})

export const blog_image = pgTable("blog_image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    blog_id: text("blog_id").references(() => blog.id),
  image_id: text("image_id").references(() => image.id),
})

export const song = pgTable("song", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  song_uuid: text("song_uuid"),
  note: text("note").$defaultFn(() => ""),
  highlighted: boolean("highlighted").$defaultFn(() => false)
})

export const media = pgTable("media", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  media_uuid: text("media_uuid"),
  stars: integer("stars"),
  note: text("note").$defaultFn(() => ""),
  highlighted: boolean("highlighted").$defaultFn(() => false),
  is_tv_show: boolean("is_tv_show").$defaultFn(() => false)
})

export type Image = typeof image.$inferSelect
export type Project = typeof project.$inferSelect
export type Skill = typeof skill.$inferSelect
export type Project_Image = typeof project_image.$inferSelect
export type Blog = typeof blog.$inferSelect
export type Blog_Image = typeof blog_image.$inferSelect
export type Song = typeof song.$inferSelect
export type Media = typeof media.$inferSelect