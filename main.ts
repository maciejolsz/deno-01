import { Application, Router } from "https://deno.land/x/oak@v12.5.0/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts"; // Updated SQLite module version

export interface Hero {
  id?: number;
  name: string;
  power: string;
}

export interface Villain {
  id?: number;
  name: string;
  power: string;
}

const db = new DB("heroes.db"); // Connect to your SQLite database

function createHeroesTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS heroes (
      id INTEGER PRIMARY KEY,
      name TEXT,
      power TEXT
    )
  `);
}

function createVillainsTable() {
  db.execute(`
    CREATE TABLE IF NOT EXISTS villains (
      id INTEGER PRIMARY KEY,
      name TEXT,
      evilPower TEXT
    )
  `);
}

function fetchHeroes(): Hero[] {
  return db.query("SELECT * FROM heroes").map((row) => ({
    id: row[0],
    name: row[1],
    power: row[2],
  })) as Hero[];
}

function fetchVillains(): Villain[] {
  return db.query("SELECT * FROM villains").map((row) => ({
    id: row[0],
    name: row[1],
    power: row[2],
  })) as Villain[];
}

if (import.meta.main) {
  const app = new Application();
  const router = new Router();

  createHeroesTable();
  createVillainsTable();

  const heroes = fetchHeroes();
  const villains = fetchVillains();

  // Hero list endpoint
  router.get("/heroes", (ctx) => {
    ctx.response.body = heroes;
  });

  // Hero details endpoint
  router.get("/heroes/:id", (ctx) => {
    const id = parseInt(ctx.params.id!);
    const hero = heroes.find(h => h.id === id);
    if (hero) {
      ctx.response.body = hero;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Hero not found" };
    }
  });

  // Villain list endpoint
  router.get("/villains", (ctx) => {
    ctx.response.body = villains;
  });

  // Villain details endpoint
  router.get("/villains/:id", (ctx) => {
    const id = parseInt(ctx.params.id!);
    const villain = villains.find(v => v.id === id);
    if (villain) {
      ctx.response.body = villain;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { message: "Villain not found" };
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  console.log("Server running on http://localhost:8000");
  await app.listen({ port: 8000 });

  // Close the database connection when done
  db.close();
}
