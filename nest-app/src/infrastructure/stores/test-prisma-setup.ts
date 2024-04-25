import { PrismaClient } from '@prisma/client';

export class TestPrismaSetup {
  constructor(private prisma: PrismaClient) {}
  async save(id: string) {
    await this.prisma.exampleTable.create({ data: { type: 'type', id } });
  }
}
