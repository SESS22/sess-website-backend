import {getContactLinks, getMailgunApi} from "../services/contactData.js"
import dotenv from "dotenv";
dotenv.config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const RECEPIENT = process.env.MAIL_RECEIVER;

export const fetchContactLinks = async (req, res) => {
   try {
    const data = await getContactLinks();
    res.json(data);
   } catch (error) {
    console.log("contactCtrl: fetchContactLinks(): ", error);
   }
};

const mailgunEmailSender = (message) => {
    const {senderName, senderEmail, content} = message;
    const subject = `Feedback from ${senderName}`;

    const messageData = {
        from: `${senderName} <${senderEmail}>`,
        to: RECEPIENT,
        subject: `${subject}`,
        text: `${content}`
    };
      
    const client = getMailgunApi();
    client.messages.create(DOMAIN, messageData)
    .then((res) => {
        console.log(res);
        return true;
    })
    .catch((err) => {
        console.error("contactCtrl: mailgunEmailSender(): ", err);
        return false;
    });
}

export const sendFeedback =  (req, res) => {
    try {
        const request = mailgunEmailSender({
            senderName: req.body.senderName,
            senderEmail: req.body.senderEmail,
            content: req.body.content
        })
        res.send(request); // D: returns a boolean
    } catch (error) {
        console.error("contactCtrl: sendFeedback(): ", error);
        res.status(500).send("Internal Server Error");
    }
    
};
