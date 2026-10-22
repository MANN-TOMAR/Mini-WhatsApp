try {
    require("dotenv").config();
} catch (e) {}

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/whatsApp";

const sampleChats = [
  {
    from: "Iron Man",
    to: "Spider-Man",
    msg: "Kid, time to upgrade your suit. Meet me at the lab.",
    sendAt: new Date(),
  },
  {
    from: "Captain America",
    to: "Falcon",
    msg: "On your left.",
    sendAt: new Date(),
  },
  {
    from: "Thor",
    to: "Loki",
    msg: "If you betray me again, I swear I will throw you into the sun.",
    sendAt: new Date(),
  },
  {
    from: "Black Widow",
    to: "Hawkeye",
    msg: "Budapest all over again?",
    sendAt: new Date(),
  },
  {
    from: "Hulk",
    to: "Thor",
    msg: "Puny god.",
    sendAt: new Date(),
  },
  {
    from: "Doctor Strange",
    to: "Wong",
    msg: "Do you have the book of Cagliostro?",
    sendAt: new Date(),
  },
  {
    from: "Star-Lord",
    to: "Gamora",
    msg: "Did you turn off the dynamic thrusters on the Milano?",
    sendAt: new Date(),
  },
  {
    from: "Rocket Raccoon",
    to: "Groot",
    msg: "Stop pressing that button!",
    sendAt: new Date(),
  },
  {
    from: "Black Panther",
    to: "Shuri",
    msg: "Wakanda forever. Is the vibranium shield ready?",
    sendAt: new Date(),
  },
  {
    from: "Scarlet Witch",
    to: "Vision",
    msg: "We are an unusual couple, you know.",
    sendAt: new Date(),
  },
  {
    from: "Ant-Man",
    to: "The Wasp",
    msg: "I think we need to go back into the Quantum Realm.",
    sendAt: new Date(),
  },
  {
    from: "Deadpool",
    to: "Wolverine",
    msg: "Wanna do a team-up movie? It'll make a billion dollars.",
    sendAt: new Date(),
  },
  {
    from: "Nick Fury",
    to: "Captain Marvel",
    msg: "We have an emergency. Paging you now.",
    sendAt: new Date(),
  },
  {
    from: "Groot",
    to: "Rocket Raccoon",
    msg: "I am Groot.",
    sendAt: new Date(),
  },
  {
    from: "Thanos",
    to: "Gamora",
    msg: "The universe requires correction.",
    sendAt: new Date(),
  },
  {
    from: "Daredevil",
    to: "Foggy Nelson",
    msg: "Meet me at the office, we have a new client.",
    sendAt: new Date(),
  },
  {
    from: "Professor X",
    to: "Wolverine",
    msg: "Logan, we need you at the school.",
    sendAt: new Date(),
  },
  {
    from: "Magneto",
    to: "Professor X",
    msg: "Peace was never an option, Charles.",
    sendAt: new Date(),
  },
  {
    from: "Moon Knight",
    to: "Steven Grant",
    msg: "Let me take the body, Steven, it's getting dangerous.",
    sendAt: new Date(),
  },
  {
    from: "Shang-Chi",
    to: "Katy",
    msg: "Bus ride was crazy today. Call me back.",
    sendAt: new Date(),
  }
];

async function seedDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB for seeding...");
        await Chat.insertMany(sampleChats);
        console.log("Sample chats inserted successfully!");
    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

seedDB();
