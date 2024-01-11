import express from "express";
const Router = express.Router();

import {
    fetchAnnouncementData,
    fetchLatestUpcomingEvent,
} from "../controllers/homeCtrl.js"

Router.get("/announcementData", fetchAnnouncementData);
Router.get("/upcomingEvent", fetchLatestUpcomingEvent);

export  {Router as homeRoute};