const { PrismaClient } = require('c:\\Users\\MSI\\Downloads\\monbacfrancais\\backend\\node_modules\\@prisma/client');
const prisma = new PrismaClient();

async function checkSuccessfulArticles() {
  try {
    console.log('Querying articles with structured key points (containing "Informations clés")...');
    const articles = await prisma.actualite.findMany({
      where: {
        contenu: {
          contains: 'Informations clés'
        }
      },
      take: 5,
      select: {
        id: true,
        titre: true,
        contenu: true,
        sourceUrl: true,
      }
    });

    console.log(`Found ${articles.length} successfully structured articles.`);

    for (let i = 0; i < articles.length; i++) {
      const art = articles[i];
      console.log(`\n--- Article ${i + 1} ---`);
      console.log(`Titre: ${art.titre}`);
      console.log(`URL: ${art.sourceUrl}`);
      console.log(`Contenu (first 800 chars):`);
      console.log(art.contenu.substring(0, 800) + '\n...');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

checkSuccessfulArticles();
