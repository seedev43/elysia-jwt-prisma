import Elysia from "elysia";
import { jsonWebToken } from "../utils/jwt";
import { verifyToken } from "../middlewares/authJsonWebToken";
import { dashboard, index } from "../controllers/indexController";

const indexRoutes = new Elysia()
    .use(jsonWebToken)
    .get("/", index)
    .onBeforeHandle(async ({ jwt, set, request: { headers } }) => verifyToken({ jwt, set, headers }))
    .get("/dashboard", dashboard)

export default indexRoutes