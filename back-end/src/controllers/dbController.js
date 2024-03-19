const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAssignments(req, res) {
  try {
    const assignments = await prisma.assignment_data.findMany();
    const response = JSON.stringify(
      assignments,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // Convert BigInt to string, problem for later
    );
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).send("Server Error");
  }
}

async function getUserStats(req, res) {
    try {
        const userReq = req.body.user;
        if (!userReq) return res.status(400).send('"User" is a required field');

        const userData = await prisma.personal_data.findUnique({
            where: {
                user: userReq
            }
        });

        if (!userData) {
            return res.status(404).send('User not found');
        }

        res.json(userData);
    }
    catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Server Error");
    }
}

module.exports = { getAssignments, getUserStats };
