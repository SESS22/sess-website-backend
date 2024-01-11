import {db} from "../utils/dbConfig.js"
import {collection, getDocs} from "firebase/firestore"

// ONLY ONE ANNOUNCEMENT IS SENT 
const docRef = collection(db, "announcement");

// Async func
export const getAnnouncementData = async () =>{
    try{
        const documentSnapshot = await getDocs(docRef);
        const data = documentSnapshot.docs.map(doc => doc.data());
        
        return data;  
    }
    catch(error){
        console.log("homeData: getAnnouncementData(): ", error);
    }
}





