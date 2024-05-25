import Elysia from "elysia";
import { jsonWebToken } from "../utils/jwt";

export const verifyToken = async ({ jwt, set, headers }: any) => {
    const authorization = headers.get('Authorization')

    if (!authorization || authorization.split(" ")[0] !== "Bearer") {
        set.status = 401;
        return {
            success: false,
            message: "bearer token is missing",
        };
    }

    const token = authorization.split(" ")[1];

    if (!token) {
        set.status = 401;
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    const payload = await jwt.verify(token);
    if (!payload) {
        set.status = 401;
        return {
            success: false,
            message: "Unauthorized",
        };
    }

}


// export const verifyToken = new Elysia()
//     .use(jsonWebToken)
//     .derive(async ({ jwt, set, request: { headers } }) => {
//         console.log(headers);

//         const authorization = headers.get('Authorization')
//         if (!authorization) {
//             set.status = 401;
//             return {
//                 success: false,
//                 message: "Unauthorized",
//             };
//         }
//         const token = authorization.split(" ")[1];
//         // console.log(token);

//         if (!token || authorization.split(" ")[0] !== "Bearer") {
//             set.status = 401;
//             return {
//                 success: false,
//                 message: "Unauthorized",
//             };
//         }

//         const payload = await jwt.verify(token);
//         if (!payload) {
//             set.status = 401;
//             return {
//                 success: false,
//                 message: "Unauthorized",
//             };
//         }

//         return { payload }
//     })
// .guard(
//     {
//         async beforeHandle({ jwt, set, request: { headers } }) {
//             const authorization = headers.get('Authorization')
//             if (!authorization) {
//                 set.status = 401;
//                 return {
//                     success: false,
//                     message: "Unauthorized",
//                 };
//             }
//             const token = authorization.split(" ")[1];
//             // console.log(token);

//             if (!token || authorization.split(" ")[0] !== "Bearer") {
//                 set.status = 401;
//                 return {
//                     success: false,
//                     message: "Unauthorized",
//                 };
//             }

//             const payload = await jwt.verify(token);
//             if (!payload) {
//                 set.status = 401;
//                 return {
//                     success: false,
//                     message: "Unauthorized",
//                 };
//             }

//         }
//     }
// )