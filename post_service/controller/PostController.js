import axios from "axios";
import prisma from "../config/db.config.js"

async function index(req, res) {
    try {
        // Fetch posts
        const posts = await prisma.post.findMany({});

        // Extract user IDs from posts
        const userIds = posts.map((item) => item.user_id);

        // Fetch users
        const response = await axios.post(`http://localhost:3001/api/getUsers`, userIds);
        const users = response.data.users.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});

        // Combine posts with corresponding users
        const postWithUsers = await Promise.all(
            posts.map((post) => ({
                ...post,
                user: users[post.user_id],
            }))
        );

        return res.json({ postWithUsers });
    } catch (error) {
        console.error("Error in post index service:", error);
        return res.status(500).json({ message: "Error in post index service..." });
    }
}



async function store(req, res) {
    const authUser = req.user;
    const { title, content } = req.body;
    const post = await prisma.post.create({
        data: {
            user_id: authUser.id,
            title,
            content
        }
    });

    return res.json({ message: "Post created successfully..." });

}

// Exporting the functions
export default {
    index,
    store
};
