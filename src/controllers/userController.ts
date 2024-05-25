import prisma from "../config/prisma"
import { getRandomNumber } from "../utils/functions"

export const register = async (body: any, set: any) => {
    const { name, username, email, password } = body
    // console.log(username);

    if (!username || !email || !password) {
        set.status = 400
        return {
            success: false,
            message: "username, email, and password are required"
        }
    }

    try {
        // Check for existing email
        const emailUser = await prisma.user.findUnique({
            where: { email }
        });

        if (emailUser) {
            set.status = 400
            return {
                success: false,
                message: "email is already in use"
            }
        }

        // Check for existing username
        const usernameUser = await prisma.user.findUnique({
            where: { username }
        });

        if (usernameUser) {
            set.status = 400

            return {
                success: false,
                message: "username is already in use"
            }
        }

        // creating new user
        const user = await prisma.user.create({
            data: {
                name: name ?? `User #${getRandomNumber(1, 99)}`,
                email: email,
                username: username,
                password: await Bun.password.hash(password, {
                    algorithm: "bcrypt"
                })
            }
        })

        set.status = 201

        return {
            success: true,
            message: "User Registered Successfully",
            data: user
        }

    } catch (error) {
        set.status = 500

        return {
            success: false,
            message: "Internal Server Error"
        }
    }
}

export const login = async (body: any, set: any, jwt: any) => {

    const { username, password } = body

    if (!username || !password) {
        set.status = 400
        return {
            success: false,
            message: "username and password are required"
        }
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if (!user) {
            set.status = 404

            return {
                success: false,
                message: "user not found"
            }
        }
        const passwordIsValid = await Bun.password.verify(
            password,
            user.password
        );

        if (!passwordIsValid) {
            set.status = 401

            return {
                success: false,
                message: "invalid password",
            }
        }

        const generateToken = await jwt.sign({
            id: user.id,
            name: user.name,
            username: user.username
        })

        set.status = 200

        return {
            success: true,
            message: "login success",
            accessToken: generateToken
        }

    } catch (error) {
        set.status = 500
        return {
            success: false,
            message: "Internal Server Error"
        }
    }

}