export default function verifyToken(req, res, next){
    const authToken = req.headers.authorization;
    const expectedToken = process.env.FIREBASE_AUTH_CUSTOM_TOKEN;

    if(authToken && authToken === expectedToken){
        next();
    } 
    else{
        res.status(401).send({
            error: "Unauthorized",
            message: "Invalid authentication credentials provided."
        });
    }
       


};