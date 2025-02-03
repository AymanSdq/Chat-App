import jwt, { JwtPayload }  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";


// Interface to let Typecsript know the value of userId
interface decodeToken extends JwtPayload{
    userId : string
}

// Decalring global variable in Express to be able to use request.user
declare global {
    namespace Express {
        export interface Request {
            user : {
                id : string,
            }
        }
    }
}

const protectedRoute = async (request : Request, response : Response, next : NextFunction) => {

    try {
        // Calling the jwt token from the cookies
        const token = request.cookies.jwt
        if(!token){
            response.status(402).json({message : "You need to be Logged In !"})
            return;
        }
        // Decoding the token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET!) as decodeToken;
        if(!decodeToken){
            response.status(401).json({message : "Invalid Token!"});
            return;
        }
        // Getting the userId from the TOken
        const user = await prisma.user.findUnique({where : {id : decodeToken.userId}, select : {
            id : true,
            username : true,
            fullName : true,
            profilePic : true
        }});
        // If no user
        if(!user) {
            response.status(404).json({message : "User not Found!"});
            return;
        }
        request.user = user
        // If Everything is Good
        next();
    } catch (error : any) {
        console.log("Error signing up : " , error.message);
        response.status(500).json({Error : "Internal Server Error !"})
    }

}


export default protectedRoute
