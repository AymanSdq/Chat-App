import { Request , response, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs"

// Signup Controller
export const signUp = async ( request : Request, response : Response) => {
    try {
        // Getting all the fiels needed to create and account!
        const {fullName, username, password, confirmPassword, gender} = request.body;
        
        // Checking if all the fields are entered if not return
        if( !fullName || !username || !password || !confirmPassword || !gender ){
            response.status(400).json({Error : "Please fill in All Fields"});
            return;
        }

        // Checking of the password are the same or not !
        if(password !== confirmPassword){
            response.status(400).json({Error : "Password doesn't Match !"});
            return;
        }

        // Check if the username already existe in our database or Not If it existe retun
        const  user = await prisma.user.findUnique({where : { username }})
        if(user){
            response.status(400).json({Error : "User already Exist !"});
            return;
        }

        // Hashing the password with Bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        

    } catch (error) {
        
    }
}

// Login Controller
export const login = async ( request : Request, response : Response) => {
    
}

// Log out Controller
export const logOut = async ( request : Request, response : Response) => {
    
}