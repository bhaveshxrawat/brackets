import { JsonDatabase } from "brackets-json-db";
import { BracketsManager } from "brackets-manager";
import fs from "fs";

async function createJSON() {
  const db = new JsonDatabase();
  const manager = new BracketsManager(db);
  // Create an elimination stage for tournament `3`.
  await manager.create.stage({
    tournamentId: 1,
    name: "Elimination stage",
    type: "single_elimination",
    seeding: [
      "Team 1",
      "Team 2",
      "Team 3",
      "Team 4",
      "Team 5",
      "Team 6",
      "Team 7",
      "Team 8",
      "Team 9",
      "Team 10",
      "Team 11",
      "Team 12",
      "Team 13",
      "Team 14",
      "Team 15",
      "Team 16",
    ],
    settings: { grandFinal: "single", consolationFinal: false },
  });

  await manager.update.match({
    id: 0,
    opponent1: { score: 1, result: "win" },
    opponent2: { score: 0, result: "bye" },
  });
}

try {
  if (fs.existsSync("db.json")) {
    console.log("if");
    fs.unlinkSync("db.json");
    createJSON();
  } else {
    console.log("else");
    createJSON();
  }
} catch (e) {
  throw new Error(e);
}
