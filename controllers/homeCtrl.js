import { getAnnouncementData,} from "../services/homeData.js"
import {getLatestUpcomingEvent,} from "../services/eventData.js"
import {formatter} from "../utils/helper.js"

export const fetchAnnouncementData = async (req, res) =>{
    // get all data from the db
    try {
        const announcementDataObject =  await getAnnouncementData(); 
        return res.json(announcementDataObject);
    } catch (error) {
        console.error("homeCtrl: fetchAnnouncementData(): ", error);
    }
};

export const fetchLatestUpcomingEvent = async (req, res) => {
    try {
        const upcomingEventDataObject = await getLatestUpcomingEvent();
        const data = upcomingEventDataObject.map(item => formatter(item))
        return res.json(data);
    } catch (error) {
        console.error("homeCtrl: fetchLatestUpcomingEvent(): ", error);
    }
}


