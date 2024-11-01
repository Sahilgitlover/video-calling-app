import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import onCall from "./socket-events/onCall.js";
import onWebrtcSignal from "./socket-events/onWebrtcSignal.js";
import onHangup from "./socket-events/onHangup.js";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

console.log("running...");

export let io;
app.prepare().then(() => {
  const httpServer = createServer(handler);

  io = new Server(httpServer);
  let onlineUsers = []

  io.on("connection", (socket) => {
    console.log('user connected : ',socket.id)
    socket.on('addNewUsers' ,(clerkUser) => {
      clerkUser && !onlineUsers.some(user => user?.userId === clerkUser.id ) && onlineUsers.push({
        userId:clerkUser.id,
        socket:socket.id,
        profile: clerkUser
      })
      io.emit('getUsers',onlineUsers)
    })

    socket.on('disconnect' ,() => {
      onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
      io.emit('getUsers',onlineUsers)
    })

    socket.on('call',onCall)
    socket.on('webrtcSignal',onWebrtcSignal)
    socket.on('hangup',onHangup)
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
}); 