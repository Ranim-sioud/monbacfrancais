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
  } catch (err: any) {
  console.error("===== PRISMA ERROR =====");

  if (err.stdout) {
    console.error(err.stdout.toString());
  }

  if (err.stderr) {
    console.error(err.stderr.toString());
  }

  console.error(err);
}
}