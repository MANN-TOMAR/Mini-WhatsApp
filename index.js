try {
    require("dotenv").config();
} catch (e) {
    // In production (e.g. Render), environment variables are provided via process.env
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/whatsApp";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.redirect("/chats");
});

app.get("/chats", async (req, res) => {
    try {
        const chats = await Chat.find({});
        res.render("chat.ejs", { chats });
    } catch (err) {
        console.error("Error fetching chats:", err);
        res.status(500).send("Error fetching chats");
    }
});

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", async (req, res) => {
    try {
        const { from, to, msg } = req.body;
        await Chat.create({
            from,
            to,
            msg,
            sendAt: new Date()
        });
        res.redirect("/chats");
    } catch (err) {
        console.error("Error creating chat:", err);
        res.status(500).send("Error creating chat");
    }
});

app.get("/chats/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Chat.find({ _id: id });
        if (!message || message.length === 0) {
            return res.status(404).send("Message not found");
        }
        res.render("edit.ejs", { message });
    } catch (err) {
        console.error("Error fetching chat for edit:", err);
        res.status(500).send("Error fetching chat");
    }
});

app.patch("/chats/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { msg } = req.body;
        await Chat.updateOne({ _id: id }, { msg: msg });
        res.redirect("/chats");
    } catch (err) {
        console.error("Error updating chat:", err);
        res.status(500).send("Error updating chat");
    }
});

app.delete("/chats/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Chat.findByIdAndDelete(id);
        res.redirect("/chats");
    } catch (err) {
        console.error("Error deleting chat:", err);
        res.status(500).send("Error deleting chat");
    }
});
