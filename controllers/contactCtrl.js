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

const mailgunEmailSender = async (message) => {
    const {senderName, senderEmail, content} = message;
    const subject = `Feedback from ${senderName}`;

    const messageData = {
        from: `${senderName} <${senderEmail}>`,
        to: RECEPIENT,
        subject: `${subject}`,
        text: `${content}`
    };

    const client = getMailgunApi();
    const createMessage = await client.messages.create(DOMAIN, messageData);
    console.log(createMessage.status)
    return createMessage.status === 200
}

export const sendFeedback = async (req, res) => {
    console.log()
    console.log(req.body)
    try {
        
        const request = await mailgunEmailSender({
            senderName: req.body.senderName,
            senderEmail: req.body.senderEmail,
            content: req.body.content
        });

        console.log(request)
  
        if (request === true)
            return res.status(200).send("email-sent")
        else
            return res.status(400).send("error-sending-email")
        
    } catch (error) {
        console.error("contactCtrl: sendFeedback(): ", error);
        return res.status(500).send("Internal Server Error");
    }
    
};
