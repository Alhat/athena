const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addNewFieldToDocuments() {
    const updateResult = await prisma.user_data.updateMany({
        data: {
            // Assuming 'settings' is a JSON column, you can use this syntax:
            settings: {
                // Merge the existing 'settings' with new fields
                set: {
                    notifications: false,
                    theme: "dark",
                    toDoFilter: "priority",
                    inProgressFilter: "priority",
                    doneFilter: "priority",
                },
            },
        },
    });

    console.log(`${updateResult.count} documents updated.`);
}

addNewFieldToDocuments()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });


