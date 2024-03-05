import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import verifyToken from "./middleware/verifyToken.js";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(verifyToken) // D: middleware for request verification

/*  MODULES */
import { homeRoute } from "./routes/homePage.js";
import { eventRoute } from "./routes/eventPage.js";
import {contactRoute} from "./routes/contactPage.js";

const PORT = process.env.PORT || 6060;

app.use( '/api/home', homeRoute);
app.use( '/api/event', eventRoute);
app.use( '/api/contact', contactRoute);

app.listen(PORT, ()=>{
    console.log(`Running on: http://localhost:${PORT}`);
})