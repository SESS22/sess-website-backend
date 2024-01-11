import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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