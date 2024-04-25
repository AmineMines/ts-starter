import { PrismaClient } from '@prisma/client';

import { TestPrismaSetup } from './test-prisma-setup';

describe(`TestPrismaSetup`, () => {
  let prismaClient: PrismaClient;
  beforeAll(() => {
    prismaClient = new PrismaClient();
  });

  beforeEach(async () => {
    await prismaClient.exampleTable.deleteMany({});
  });

  it(`should be able to leverage prisma to access integration test db`, async () => {
    const testPrismaSetup = new TestPrismaSetup(prismaClient);
    await testPrismaSetup.save('123');
    const exampleResult = await prismaClient.exampleTable.findMany({});
    expect(exampleResult).toEqual([{ id: '123', type: 'type' }]);
  });
});
