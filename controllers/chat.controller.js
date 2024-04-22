import { Server as socketIO } from "socket.io";


export const initChat = (server) => {

    const io = new socketIO(server, {
        cors: {
            origin: process.env.CLIENT_URL
        },
        pingTimeout: 60000,
        
    });

    io.on("connection", (socket) => {

        socket.on("disconnect", () => {
        })
        socket.on("send message", data => {
            console.log(data)
            io.emit("message", data)
        })
    })

}



