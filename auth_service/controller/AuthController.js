import prisma from "../config/db.config.js"
import * as bcrypt from "bcrypt"
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

        return res.json({ message: "Login successful!", user });
    } catch (error) {
        console.error("Error in login service:", error);
        return res.status(500).json({ message: "Error in login service." });
    }
}


// Exporting the functions
export default {
    register,login
};
