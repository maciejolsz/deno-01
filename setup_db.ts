import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts"; // Updated SQLite module version
import type { Hero } from "./main.ts";
import type { Villain } from "./main.ts";

// Create a new database or open an existing one
const db = new DB("heroes.db");

const heroes: Hero[] = [
    { name: "Superman", power: "Super strength" },
    { name: "Batman", power: "Intelligence" },
    { name: "Wonder Woman", power: "Combat skills" },
    { name: "Flash", power: "Super speed" },
    { name: "Green Lantern", power: "Energy manipulation" },
  ];

const villains: Villain[] = [
    { name: "Lex Luthor", power: "Genius intellect" },
    { name: "Joker", power: "Psychological manipulation" },
    { name: "Cheetah", power: "Super speed" },
    { name: "Darkseid", power: "God-like strength" },
  ];

// Insert sample data into the heroes table
function insertHero(hero: Hero) {
  db.execute(`INSERT INTO heroes (name, power) VALUES ('${hero.name}', '${hero.power}')`);
}

// Insert sample data into the villains table
function insertVillain(villain: Villain) {
  db.execute(`INSERT INTO villains (name, power) VALUES ('${villain.name}', '${villain.power}')`);
}

// Create the heroes and villains tables
db.execute(`
  DROP TABLE IF EXISTS heroes;
  CREATE TABLE IF NOT EXISTS heroes (
    id INTEGER PRIMARY KEY,
    name TEXT,
    power TEXT
  );
`);

db.execute(`
  DROP TABLE IF EXISTS villains;
  CREATE TABLE IF NOT EXISTS villains (
    id INTEGER PRIMARY KEY,
    name TEXT,
    power TEXT
  );
`);

for (const hero of heroes) {
  try {
    insertHero(hero);
    console.log(`Inserting hero: ${hero.name}, ${hero.power}`);
  } catch (error) {
    console.error("Error inserting hero:", error);
  }
}

for (const villain of villains) {
  try {
    insertVillain(villain);
    console.log(`Inserting villain: ${villain.name}, ${villain.power}`);
  } catch (error) {
    console.error("Error inserting villain:", error);
  }
}

console.log("Done inserting heroes and villains");

// Close the database connection
db.close();

console.log("Database setup complete. Sample heroes and villains added.");
