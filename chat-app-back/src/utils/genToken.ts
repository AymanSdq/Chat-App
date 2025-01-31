// Setup JSONWebToken
import jwt from "jsonwebtoken";
import { Response } from "express";

// Creating a function to receive the ID of the user to generate the token
const genToken = (userId : string, response : Response) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET! , {
        expiresIn : "15d"
    });

    response.cookie("jwt", token , {
        // Cookie Age
        maxAge : 15 * 24 * 60 * 60 * 1000,
        // Preventing JS Injection to avoid XSS 
        httpOnly: true,
        // Preventing csrf
        sameSite : "strict",
        secure : process.env.NODE_ENV !== "development"
    })

    return token
}

export default genToken;