import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const jsonWebToken = new Elysia({
    name: "jwt",
}).use(
    jwt({
        name: "jwt",
        secret: Bun.env.SECRET_KEY!,
        exp: "10m"
    })
)