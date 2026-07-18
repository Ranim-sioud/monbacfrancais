import { execSync } from "child_process";

export async function bootstrap() {
  if (process.env.NODE_ENV !== "production") return;

  try {
    console.log("===== MIGRATION =====");

    const output = execSync("npx prisma migrate deploy 2>&1", {
      encoding: "utf8",
    });

    console.log(output);

    console.log("===== SEED =====");

    const seed = execSync("npx prisma db seed 2>&1", {
      encoding: "utf8",
    });

    console.log(seed);

    console.log("===== BOOTSTRAP OK =====");
  } catch (e: any) {
    console.error("===== PRISMA OUTPUT =====");

    console.error(e.stdout);
    console.error(e.stderr);
    console.error(e.message);
  }
}