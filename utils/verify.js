import { JWT } from 'node-jsonwebtoken';
import 'dotenv/config'

const jwt = new JWT(process.env.ACCESS_TOKEN);


//validates the token from the header 
//if token is correct it allows calls the next method 
//otherwise stops execution 
export async function auth(req, res, next) {
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    try {
        if(token==null){
            res.send("JW token required")
        } else{
            const verified = await jwt.verify(token);
            if (verified.username == 'jash123' && verified.password == 'jash@1911') {
                next();
            } else {
                res.send("Invalid token");
            }
        }
       
    } catch (e) {
        console.log(e);
    }
} 