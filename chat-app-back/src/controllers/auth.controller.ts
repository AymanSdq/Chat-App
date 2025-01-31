import { Request , response, Response } from "express";
import prisma from "../db/prisma";
import bcrypt from "bcryptjs"
import genToken from "../utils/genToken";

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

        // Using API for profile Picture
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        // Creating the User
        const newUser = await prisma.user.create({
            data : {
                fullName,
                username,
                password : hashedPassword,
                gender,
                profilePic : gender === "male" ? boyProfilePic : girlProfilePic
            }
        })

        // Checking if the user is create 
        if(newUser){
            // Creating a Token and saving it into cookies
            genToken(newUser.id , response)
            // Saving data
            response.status(202).json({
                id : newUser.id,
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic
            })
        }else{
            response.status(400).json({Error : "Invalide user data!"})
        }

    } catch (error : any ) {
        console.log("Error signing up : " , error.message);
        response.status(500).json({Error : "Internal Server Error !"})
    }
}

// Login Controller
export const login = async ( request : Request, response : Response) => {
    try {
        // Getting the username and the password
        const {username, password} = request.body;

        // Finding the username if it Exist
        const user = await prisma.user.findUnique({ where : {username}})
        if(!user){
            response.status(400).json({Error : "Username or Password are Incorect !"})
            return;
        }

        // Verifying if the password is correct or no
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
            response.status(400).json({Error : "Username or Password are Incorect !"})
            return
        }

        // Generate Token if the Credentials are Correct
        genToken(user.id, response);
        response.status(202).json({
            id : user.id,
            fullName : user.fullName,
            username : user.id,
            profilePic : user.profilePic
        })
        
    } catch (error : any) {
        console.log("Error signing up : " , error.message);
        response.status(500).json({Error : "Internal Server Error !"})
    }
}

// Log out Controller
export const logOut = async ( request : Request, response : Response) => {
    
}