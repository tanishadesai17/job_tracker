const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 8080;

// HTTP and socket.io server
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/jobtracker")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));

const applicationRoutes = require("./routes/applications");
app.use("/applications", applicationRoutes);

const loginRoutes = require("./routes/login");
app.use("/users", loginRoutes);

//Test values
const Application = require("./models/Application");

//async function seedDatabase() {
// const count = await Application.countDocuments();
//  if (count === 0) {
//    await Application.insertMany([
//     {
//        company: "Google",
 //       position: "Intern",
   //     appDate: "2026-01-01",
     //   status: "Applied",
       // notes: "Test data"
 //     }
  //  ]);
   // console.log("Test data inserted.");
  //}
//}

//mongoose.connection.once("open", seedDatabase);


// SOCKET.IO
const Message = require("./models/Message");

io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // retain last 50 messages 
  const history = await Message.find().sort({ createdAt: 1 }).limit(50);
  socket.emit("message_history", history);

  socket.on("send_message", async (data) => {
  const message = new Message(data);
  await message.save();
  
  io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {console.log("User Disconnected", socket.id);});
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
