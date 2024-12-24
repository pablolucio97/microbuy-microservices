import { Product } from 'src/domain/modules/product/model/product.model';
import { PrismaService } from '../../infra/services/PrismaService';
import { products } from '../data/products';

const prisma = new PrismaService();

async function main(seeds: Product[]) {
  for (const seed of seeds) {
    const plantedSeed = await prisma.product.create({
      data: seed,
    });
    console.log(plantedSeed);
  }
}

main(products)
  .catch((error) => {
    console.log('Error at planting seeds: ', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
