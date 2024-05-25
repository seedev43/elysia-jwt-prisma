import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import indexRoutes from "./routes/indexRoutes";
import userRoutes from "./routes/userRoutes";

const app = new Elysia()
  .use(cors())
  .group("", (app) => app.use(indexRoutes))
  .group("/user", (app) => app.use(userRoutes))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
