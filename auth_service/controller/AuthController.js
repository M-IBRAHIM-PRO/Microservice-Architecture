import prisma from "../config/db.config.js"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

async function register(req, res) {
    try {
        const payload = req.body;
        const salt = await bcrypt.genSaltSync(10);
        payload.password = await bcrypt.hash(payload.password, salt);
        console.log(`Password : ${payload.password}`)

        const user = await prisma.user.create(
            {
                data: payload
            }
        )
        return res.json({ message: "Account created successfuly!", user });
    } catch (error) {
        return res.status(500).json({ message: "Error in register service..." });
    }

}
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid email or password." });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid email or password." });
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });

        return res.json({
            message: "Logged in successfully!",
            access_token: `Bearer ${token}`,
        });
    } catch (error) {
        console.error("Error in login service:", error);
        return res.status(500).json({ message: "Error in login service." });
    }
}
async function user(req, res) {
    const user = req.user;
    return res.status(200).json({ user: user });
}


// Exporting the functions
export default {
    register, login, user
};
