import Elysia, { t, ValidationError } from "elysia";
import { login, register } from "../controllers/userController";
import { jsonWebToken } from "../utils/jwt";

const userRoutes = new Elysia()
    .use(jsonWebToken)
    .post("/register", ({ body, set }) => register(body, set), {
        body: t.Object({
            name: t.Optional(t.String()),
            username: t.String(),
            email: t.String({
                format: "email",
            }),
            password: t.String({
                minLength: 3,
            }),
        }),
        type: "json"
    })
    .post("/login", ({ body, set, jwt }) => login(body, set, jwt), {
        body: t.Object({
            username: t.String(),
            password: t.String({
                minLength: 3,
            }),
        }),
        type: "json"
    })
    .onError(({ code, error, set }) => {

        // switch (code) {
        //     case "VALIDATION":
        //         console.log("MSG", error.toString());
        //         return (error as ValidationError).all[0]
        //     default:
        //         return {
        //             name: error.name,
        //             message: error.message,
        //         };
        // }
        // console.log(error.message)
        if (code === 'VALIDATION') {
            set.status = 500
            return {
                success: false,
                message: "internal server error",
                // error: error.message.
            }
        }
        // return error.validator.Errors(error.value).First().message
    })



export default userRoutes