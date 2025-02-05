import {Request, Response } from "express";
import prisma from "../db/prisma";


export const sendMessage = async (request : Request, response : Response) => {
    try {
        // Get the message from the body
        const {message} = request.body;
        // Get the Id from params  
        const {id : receiverId} = request.params;
        // Getting the sender ID 
        const senderId = request.user.id;

        // Code to verify the conversation
        let conversation = await prisma.conversation.findFirst({where : {
            participantIds : {
                hasEvery : [senderId, receiverId]
            }
        }})

        // If the conversation doesnt existe
        if(!conversation){
            // Create the conversation
            conversation = await prisma.conversation.create({
                data : {
                    participantIds : {
                        set : [senderId, receiverId]
                    }
                }
            })
        }

        // Creating the message
        const newMessage = await prisma.message.create({
            data : {
                senderId,
                body : message,
                conversationId : conversation.id
            }
        })

        // Update the conversation ti add the messagee
        if(newMessage){
            conversation = await prisma.conversation.update({
                where : { 
                    id : conversation.id
                },
                data : {
                    messages : {
                        connect : {
                            id : newMessage.id
                        }
                    }
                }})
        }

        // SocketIo for real communication

        response.status(201).json({Message : "Message sent Succeffuly!"})

    } catch (error : any) {
        console.error("Error Message : ", error.message);
        response.status(502).json({Error : "Internal Server Error!"})
    }
}


export const getMessages = async (request : Request, response : Response) => {
    try {
        // Getting the receiver ID as receiverId
        const {id : receiverId} = request.params;
        // Getting the senderId
        const senderId = request.user.id
        const conversation = await prisma.conversation.findFirst({ where : {
            participantIds : {
                hasEvery : [senderId, receiverId]
            }
            },
            include : {
                messages : {
                    orderBy :{
                        createdAt : "asc"
                    }
                }
            }
        });

        if(!conversation){
            response.status(404).json({Messages : []})
            return;
        }

        // There is messages
        response.status(202).json(conversation.messages)
    } catch (error : any) {
        console.error("Error Message : ", error.message);
        response.status(502).json({Error : "Internal Server Error!"})
    }
}