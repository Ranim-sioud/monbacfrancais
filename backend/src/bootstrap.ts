import { execSync } from 'child_process';

export async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  try {
    console.log("===== MIGRATION =====");

    execSync("npx prisma migrate deploy", {
      stdio: "inherit",
    });

    console.log("===== SEED =====");

    execSync("npx prisma db seed", {
      stdio: "inherit",
    });

    console.log("===== BOOTSTRAP OK =====");
  } catch (err) {
    console.error("Erreur pendant bootstrap :", err);
  }
}