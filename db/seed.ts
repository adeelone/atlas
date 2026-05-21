import { PrismaClient } from "@prisma/client";
import { demoTrip } from "@/lib/demoTrip";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@atlas.local" },
    update: {},
    create: { email: "demo@atlas.local", name: "Demo Traveler" }
  });
  await prisma.trip.upsert({
    where: { slug: "demo-sea" },
    update: { data: demoTrip },
    create: { ownerId: user.id, name: demoTrip.name, slug: "demo-sea", data: demoTrip }
  });
}

main().finally(async () => prisma.$disconnect());
