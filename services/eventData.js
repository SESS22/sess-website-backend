import {db, fileStorage} from "../utils/dbConfig.js"
import {collection, getDocs, query, where, limit, orderBy, Timestamp} from "firebase/firestore"
import {getDownloadURL, ref, listAll} from "firebase/storage"

const colRef = collection(db, "upcomingEvent");
const colRefCompletedEvents = collection(db, "completedEvent");

const getAllImagesInPath = async (path) => {
    const listRef = ref(fileStorage, `images/EventImages/${path}/`);

    try {
        const allListRef = await listAll(listRef);
        
        const promise = allListRef.items.map( async (item) => {
            try {
                const url =  await getDownloadURL(item);
                if (url !== null)
                    return url;
            } catch (error) {
                console.log(error)
            }
           
        })
        const imageUrls = await Promise.all(promise);
        return imageUrls

    } catch (error) {
        console.log("eventData: getAllImagesInPath(): ", error)
        return [];
    }
    
}

export const getCompletedEvents = async () => {
    try {
        const documentSnapshot = await getDocs(colRefCompletedEvents);
        const promise = (
            documentSnapshot.docs.map(async (doc) => {
                try {
                    const images = await getAllImagesInPath(doc.data().imagesPath);
                    return {
                        id: doc.id,
                        ...doc.data(),
                        images,
                    };

                } catch (error) {
                    console.log("eventData: getCompletedEvents(): ", error);
                }
            })
        );

        const data = await Promise.all(promise);
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const getAllUpcomingEvents = async () => {
    try {
        const documentSnapshot = await getDocs(colRef);
        const data = documentSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

        return data;
    } catch (error) {
        console.log("eventData: getAllUpcomingEvents(): ", error)
    }
}

export const getLatestUpcomingEvent = async () => {
    try {
        const currentTimestamp = new Date()
        const currentFirebaseTimestamp = Timestamp.fromDate(currentTimestamp);

        const getEventQuery = query(colRef, where("startTimestamp", ">=",  currentFirebaseTimestamp), orderBy("startTimestamp"),limit(1));
        const documentSnapshot = await getDocs(getEventQuery);
        const data = documentSnapshot.docs.map(doc => doc.data());
        console.log(data)
        return data;
    } catch (error) {
        console.log("eventData: getLatestUpcomingEvent(): ", error)
    }
}
