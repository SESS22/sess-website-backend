import express from "express"
import {fetchContactLinks, sendFeedback} from "../controllers/contactCtrl.js"

const Router = express.Router();
Router.get("/contact-links", fetchContactLinks);
Router.post("/send-feedback", sendFeedback);


export {Router as contactRoute};

