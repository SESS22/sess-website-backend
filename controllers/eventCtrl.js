import {getAllUpcomingEvents, getCompletedEvents} from "../services/eventData.js"
import {formatter} from "../utils/helper.js"

// Event Cases to consider
// TBD time/date
// Just date no time
// More than one day -> march 13 - 15, 2023 


export const fetchUpcomingEventsData = async (req, res) =>{
    try {
        const response = await getAllUpcomingEvents();
        const data = response.map(doc => formatter(doc));
        return res.json(data);
    } catch (error) {
        console.log("eventCtrl: fetchUpcomingEventsData(): ", error);
    }
};

export const fetchCompletedEventData = async (req, res) =>{
    try {
        const completedEventData = await getCompletedEvents();
        const promise = completedEventData.map(event => ({id: event.id, name:event.name, gallery: event.images, image: event.images[0]}));
        const data = await Promise.all(promise);
        res.json(data);
    } catch (error) {
        console.log("eventCtrl: fetchCompletedEventData(): ", error);
    }
};

