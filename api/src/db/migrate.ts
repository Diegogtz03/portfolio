import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { exit } from 'process';

const main = async () => {
  try {
    const migrationClient = postgres(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`, { max: 1 });
    await migrate(drizzle(migrationClient), { migrationsFolder: 'src/drizzle' })
    console.log("Migration completed")
    exit(0);
  } catch (error) {
    console.error("Error during migration:", error)
    process.exit(1)
  }
}

main()