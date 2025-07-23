import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const cameras = [
  { name: "Shop Floor Camera A", location: "Shop Floor" },
  { name: "Vault Camera", location: "Vault" },
  { name: "Entrance Camera", location: "Entrance" },
];

const incidentTypes = [
  "Unauthorised Access",
  "Gun Threat",
  "Face Recognised",
  "Suspicious Activity",
  "Theft Alert",
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean up existing data
  await prisma.incident.deleteMany();
  await prisma.camera.deleteMany();

  console.log("📹 Creating cameras...");
  const createdCameras = await Promise.all(
    cameras.map((camera) =>
      prisma.camera.create({
        data: camera,
      })
    )
  );

  console.log(`✅ Created ${createdCameras.length} cameras`);

  console.log("🚨 Creating incidents...");
  const incidents = [];

  // Create 15 incidents with realistic timestamps
  for (let i = 0; i < 15; i++) {
    const camera = faker.helpers.arrayElement(createdCameras);
    const type = faker.helpers.arrayElement(incidentTypes);

    // Create incidents from the last 24 hours
    const startTime = faker.date.recent({ days: 1 });
    const endTime = new Date(
      startTime.getTime() + faker.number.int({ min: 60000, max: 300000 })
    );

    // Use different thumbnail URLs for different incident types
    let thumbnailUrl = "";
    switch (type) {
      case "Unauthorised Access":
        thumbnailUrl = `/thumbnails/t1.png`;
        break;
      case "Gun Threat":
        thumbnailUrl = `/thumbnails/t2.png`;
        break;
      case "Face Recognised":
        thumbnailUrl = `/thumbnails/t3.png`;
        break;
      case "Suspicious Activity":
        thumbnailUrl = `/thumbnails/t1.png`;
        break;
      default:
        thumbnailUrl = `/thumbnails/t1.png`;
    }

    incidents.push({
      cameraId: camera.id,
      type,
      tsStart: startTime,
      tsEnd: endTime,
      thumbnailUrl,
      resolved: faker.helpers.arrayElement([false, false, false, true]), // 75% unresolved
    });
  }

  await Promise.all(
    incidents.map((incident) =>
      prisma.incident.create({
        data: incident,
      })
    )
  );

  console.log(`✅ Created ${incidents.length} incidents`);
  console.log("🎉 Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
