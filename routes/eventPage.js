import express from "express";
import {fetchUpcomingEventsData, fetchCompletedEventData} from "../controllers/eventCtrl.js"

const Router = express.Router();

Router.get("/upcomingEvents", fetchUpcomingEventsData);
Router.get("/completedEvents", fetchCompletedEventData);

export {Router as eventRoute};