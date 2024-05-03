import prisma from "../config/db.config.js";


async function getUser(req, res) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return res.json({ user: user });
}

async function getUsers(req, res) {
  const { userIds } = req.body;
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return res.json({ users: users });
}


export default {
  getUser,
  getUsers
}