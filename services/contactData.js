import {collection, getDocs} from "firebase/firestore"
import {db} from "../utils/dbConfig.js"
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.MAILGUN_API_KEY;

import formData from 'form-data';
import Mailgun from 'mailgun.js';

const colRef = collection(db, "contactLinks");

export const getMailgunApi = () => {
    const mailgun = new Mailgun(formData);
    return mailgun.client({username: 'api', key: API_KEY});
}

export const getContactLinks = async () => {
    try {
        const snapshot = await getDocs(colRef);
        const data = snapshot.docs.map(doc => doc.data());
        return data;
    } catch (error) {
        console.log("contactData: getContactLinks(): ", error)
    }
}
